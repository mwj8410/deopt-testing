describe('Deoptimization', () => {
	console.log('\n\n\n\n');
	console.log('Actual Tests starting');
	console.log('\n\n\n\n');

	it('deopt Try/Catch', () => {
		function testTryCatch(nb) {
			try {
				return nb + nb;
			}
			catch (err) {
				return err;
			}
		}

		%OptimizeFunctionOnNextCall(testTryCatch);
		testTryCatch();
	});

	it('deopt hidden attributes', () => {
		function testHiddenAttributes(arg) {
			arg.b = 1;
		}
		%OptimizeFunctionOnNextCall(testHiddenAttributes);
		testHiddenAttributes({a: 1});
	});

	it('deopt spread', () => {
		function testSpread(...arg) {
			return { arg };
		}
		%OptimizeFunctionOnNextCall(testSpread);
		testSpread({ a: 'val' });
	});

	it('deopt destructive update', () => {
		function testUpdateArg(arg, val) {
			arg[`test${val}`] = 1;
		}
		%OptimizeFunctionOnNextCall(testUpdateArg);
		testUpdateArg({}, 1);
	});
});


describe('No Deopts', () => {
	it('object rebuild', () => {
		function objRebuild(a) {
			return Object.assign({ b: 'value' }, a);
		}
		%OptimizeFunctionOnNextCall(objRebuild);
		objRebuild({ a: 'value' });
	});
});
