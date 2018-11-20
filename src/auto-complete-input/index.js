import debounce from 'lodash/debounce';

Component({
    data: {
        // 是否处理模糊查询中
        searching: false,
        // 是否显示模糊查询结果列表
        isShowList: false,
        // 查询结果数据列表
        filtered: [],
    },
    props: {
        // 无特别声明，以下属性为input标签原生支持的属性或事件
        value: '',
        className: '',
        style: '',
        placeholder: '',
        type: 'text',
        disabled: false,
        maxlength: 140,
        focus: false,
        onInput: (e) => {},
        onConfirm: (e) => {},
        onFocus: (e) => {},
        onBlur: (e) => {},
        // 默认使用元素的value属性值作为过滤条件，若设置filterKey值，则使用filterProp对应元素属性值作为过滤条件
        filterProp: 'name',
        // 默认使用元素的name属性值作为过滤条件，若设置showProp值，则使用showProp对应元素属性值作为查询结果列表元素展示
        showProp: 'name',
        // 模糊查询回调，
        onSearch: (key, done) => {
            // key为查询关键词，可作为模糊查询参数传递到后端
            // done(err, []) 为结果回调方法，有错误时返回err。 第二个参数接受包含filterProp以及showProp字段的元素数组，作为模糊查询结果展示
            // 默认返回空数组
            done(null, []);
        },
        // 选中元素回调方法
        onSelect: (row) => {}
    },
    didMount() {
        this.timer = setTimeout(() => {
            this.search = debounce(this.search, 800);
        }, 10);
    },
    didUpdate(prevProps, prevData) {
 
    },
    didUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (this.search && this.search.cancel) {
            this.search.cancel();
        }
    },
    methods: {
        handleInput(e) {
            let key = e.detail.value;

            this.search(key);

            this.props.onInput(e);
        },
        handleConfirm(e) {
            this.props.onConfirm(e);

            // Todo 是否自动选中
        },
        handleFocus(e) {
            let key = e.detail.value;

            if (!this.data.filtered.length) {
                this.search(key);
            } else {
                this.setData({
                    isShowList: true,
                    searching: false,
                })
            }

            this.props.onFocus(e);
        },
        handleBlur(e) {
            this.setData({
                searching: false,
                isShowList: false,
                // filtered: [],
            });

            this.props.onBlur(e);
        },
        handleSelectOne(e) {
            const { record } = e.target.dataset;

            this.setData({
                value: record[this.props.showProp],
                searching: false,
                isShowList: false,
            });

            this.props.onSelect(record);

            // 若存在节流中的查询，取消查询
            this.search.cancel();
        },
        // 放在methods外面不生效，只能放methods里面，坑！
        search(key) {
            // 无输入时不作模糊查询
            if (!key) {
                this.setData({
                    isShowList: false,
                    filtered: [],
                });
                
                return;
            } else {
                this.setData({
                    searching: true,
                    isShowList: true,
                })
            }

            // 由调用方决定匹配结果
            if (this.props.onSearch) {
                this.props.onSearch(key, (err, data) => {
                    if (err) {
                        console.error(err);
                        this.setData({
                            searching: false,
                            filtered: [],
                        });
                        return;
                    }

                    if (this.data.searching) {
                        this.setData({
                            filtered: data || [],
                            searching: false,

                        })
                    }
                });
            
            // 若调用方不处理，则默认无数据
            } else {
                this.setData({
                    searching: false,
                    filtered: [],
                })
            }   
        }
    },
})