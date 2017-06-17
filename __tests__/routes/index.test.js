var index = require('../../routes/index'),
    express = require('express'),
    app = express();
// app.use(index);
console.log('hello', index.stack[0].route.stack[0].method);
// app.listen(80)
test('checks that index is running', () => {
  expect(index.stack[0].route.stack[0].method).toBe('get');
});
