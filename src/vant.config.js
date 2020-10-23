import { Step, Steps,NavBar,Button,Field  } from 'vant'

const vants = [Step, Steps,NavBar,Button,Field ]

export default {
    /**
     * Vue.use 方法会自动调用install函数
     * Install Vant Component plugin
     * @param Vue
     */
    install(Vue) {
        vants.forEach(Component => {
            Vue.use(Component)
        })
    }

}