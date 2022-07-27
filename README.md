# Alternative solution

The original solution creates the `fromCharCode` expression from scratch for every character in the input code.
What I do is this:
1. Store `fromCharCode` in `Object[0]`, which is accessible under `({})['constructor'][0]`.
2. Compile the code using this shorter pointer.
3. Prepend `delete Object[0];` to the code
4. Pass that new string to the Function constructor
5. Execute the code.

How did I execute two expressions after each other? Simple:

```js
(()=>(expression2))(expression1)
```

This code evaluates `expression1`, passes it to the function which ignores it and evaluates `expression2`.  
The cool thing is that this expression even evaluates to the result of `expression2`, so you can return a value in your code.