
# mini-ddui-comps
钉钉e应用（小程序）ui组件库，目前支持autocomplete-input,有好的ui组件需求欢迎提issues。

## 链接
- [钉钉e应用开发](https://open-doc.dingtalk.com/microapp/dev)
- [开发工具](https://open-doc.dingtalk.com/microapp/debug)

## 组件
- `autocomplete-input` 带模糊匹配的自动完成输入组件

## 安装

```bash
$ npm install mini-ddui-comps --save
```

## 使用

在页面json中文件中进行注册，如autocomplete-input组件的注册如下所示：

```json
{
  "usingComponents": {
    "autocomplete-input": "mini-ddui-comps/es/auto-complete-input/index",
  }
}
```

在axml文件中进行调用：
```html
<view>
    <autocomplete-input 
        value="1"
        className="abc"
        style="color: #333;"
        placeholder="请输入"
        type="text"
        disabled="{{false}}"
        maxlength="10"
        focus="{{false}}"
        onInput="onInput"
        onConfirm="onConfirm"
        onFocus="onFocus"
        onBlur="onBlur"
        onSearch="onSearch"
        onSelect="onSelect"  
    />
</view>
```

在js文件中处理事件：
```javascript

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
```


## 贡献

如果你有好的意见或建议，欢迎给我们提[issue](https://github.com/fisherw/mini-ddui-autocomplete-input/issues)。