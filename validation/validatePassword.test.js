const validatePassword = require('./validatePassword');
test('returns false for empty password',()=>{
    expect(validatePassword('')).toBe(false);
});
test('returns false for password without number',()=>{
    expect(validatePassword('akshfksdf')).toBe(false);
});
test('returns false for password without letters',()=>{
    expect(validatePassword('515441640')).toBe(false);
});
test('returns true for password with numbers letters and has 8 characters or more',()=>{
    expect(validatePassword('13518496dasdjsdfdj')).toBe(true);
});
test('returns false for password with numbers letters and has less than 8 characters',()=>{
    expect(validatePassword('a1')).toBe(false);
});
test('returns true for password with numbers and uppercase letters and has 8 characters or more',()=>{
    expect(validatePassword('ASDFDSF196415')).toBe(true);
});
test('returns true for password with numbers and uppercase and lowercase letters and has 8 characters or more',()=>{
    expect(validatePassword('ASDdkjfklSF196415')).toBe(true);
});

