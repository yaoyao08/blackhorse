// components/floor/floor.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        floor:{
           type:Object,
           value:''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    lifetimes:{
        attached:function(){
            console.log(this.data.floor);
            setTimeout(() => {
                
            }, 1000);
        }
    }
})
