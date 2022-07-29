import { events } from "@/utils/events"

export function useMenuDragger(containerRef,data){
    let currentComponent = null
    const dragenter=(e)=>{
        e.dataTransfer.dropEffect='move' //h5拖动的图标
    }
    const dragover=(e)=>{
        e.preventDefault()
    }
    const dragleave=(e)=>{
        e.dataTransfer.dropEffect='none'
    }
    const drop=(e)=>{   
        let blocks=data.value.blocks // 内部已经渲染的组件
        data.value={
            ...data.value,
            blocks:[
                ...blocks,
                {
                    top:e.offsetY,
                    left: e.offsetX,
                    zIndex:1,
                    focus:false,
                    key:currentComponent.key,
                    alignCenter:true
                }
            ]
        }
        currentComponent=null
    }
    const dragstart=(e,component)=>{
        // dragover在默认元素进入，必须要阻止默认行为 否则不能触发drop 添加一个移动的标识
        // dragleave 离开元素的时候
        // 松手的时候添加一个组件 根据拖拽的组件添加一个组件
        containerRef.value.addEventListener('dragenter',dragenter)
        containerRef.value.addEventListener('dragover',dragover)
        containerRef.value.addEventListener('dragleave',dragleave)
        containerRef.value.addEventListener('drop',drop)
        currentComponent=component
        events.emit('start') // 发布start
    }
    const dragend=(e)=>{
        containerRef.value.removeEventListener('dragenter',dragenter)
        containerRef.value.removeEventListener('dragover',dragover)
        containerRef.value.removeEventListener('dragleave',dragleave)
        containerRef.value.removeEventListener('drop',drop)
        events.emit('end')
    }
    return {
        dragstart,
        dragend
    }
}