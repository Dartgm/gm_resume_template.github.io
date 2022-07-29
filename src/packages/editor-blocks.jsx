import { computed,inject } from "vue";
import { onMounted } from "vue";
import { defineComponent,ref } from "vue";
export default defineComponent({
    props: {
        block: {type:Object}
    },

    setup(props){
        const blockStyles=computed(()=>({
            top: `${props.block.top}px`,
            left: `${props.block.left}px`,
            zIndex: `${props.block.zIndex}`
        }))
        const config=inject('config')
        const blockRef=ref(null)
        onMounted(()=>{
            let {offsetWidth,offsetHeight} = blockRef.value
            if(props.block.alignCenter){
                props.block.left=props.block.left-offsetWidth/2
                props.block.top=props.block.top-offsetHeight/2
                props.block.alignCenter=false
            }
            props.block.width=offsetWidth
            props.block.height=offsetHeight
        })
        return ()=>{
            const component=config.componentMap[props.block.key]
            // 获取render函数
            const RenderComponent=component.render()
            return <div class="editor-block" draggable="true" style={blockStyles.value} ref={blockRef}>
                {RenderComponent}
            </div>
        }
    }
})