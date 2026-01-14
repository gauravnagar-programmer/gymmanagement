// create rate limiting with the concept of Token bucket

const Buckets = new Map();


const Limiting = (req, res, next) => {
  const capacity = 10;
  const ip = req.ip || 'anonymous'; 
  const refillRate = 10 / 60
  console.log(refillRate)
  const now = Date.now();

  if (Buckets.size > 1000) {
    Buckets.clear(); 
  }

  let bucket = Buckets.get(ip) || { tokens: capacity, lastRefill: now };

  // 1. Calculate how many tokens to add based on time passed
  const secondsPassed = (now - bucket.lastRefill) / 1000;
  const tokensToAdd = secondsPassed * refillRate;
  
  // 2. Update potential tokens (but don't save to bucket yet)
  let currentTokens = Math.min(capacity, bucket.tokens + tokensToAdd);

  if (currentTokens >= 1) {
    // 3. SUCCESS: Consume 1 token and update the timestamp
    bucket.tokens = currentTokens - 1;
    bucket.lastRefill = now; // Only update timestamp on SUCCESS
    Buckets.set(ip, bucket);
    next();
  } else {
    // 4. FAIL: Do NOT update lastRefill here. 
    // This allows tokens to continue accumulating while they wait.
    res.status(429).json(
      {message : "Too many request please wait !"}
    );
  }
  
};

export default Limiting