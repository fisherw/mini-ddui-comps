
Page({
    data: {
        
    },
    onLoad() {
        console.log('on load');
    },
    onInput(e) {
        console.log('on input', e);
    },
    onConfirm(e) {
        console.log('on confirm:', e);
    },
    onFocus(e) {
        console.log('onFocus:', e);
    },
    onBlur(e) {
        console.log('on blur:', e);
    },
    onSearch(key, done) {
        console.log('on search:', key);

        setTimeout(() => {
            done(null, [{name: 'a',value: '0',},
                {name: 'aa', value: '1',},
                {name: 'aba',value: '2',},
                {name: 'abc',value: '3',},
                {name: 'abcd',value: '4',},
                {name: 'bcf',value: '5',},
                {name: '中国',value: '6',},
                {name: '家中',value: '7',},
                {name: '你好',value: '8',},
                {name: '好啊',value: '9',}].filter(item => item['name'].includes(key))
            )
        }, 1200);
    },
    onSelect(row) {
        console.log('on select:', row);
    }
})