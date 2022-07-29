import { computed,ref } from "vue"
export function useFocus(data,callback){
    const selectIndex=ref(-1)
    // 最后选中的那个元素
    const lastSelectBlock=computed(()=>data.value.blocks[selectIndex.value])
    const clearBlockFocus=()=>{
        data.value.blocks.forEach(block=>block.focus=false)
        selectIndex.value=-1
    }
    const blockMousedown=(e,block,index)=>{
        e.preventDefault()
        e.stopPropagation()
        // block上我们规划一个属性叫做focus设置为true,否则就是false
        if(e.shiftKey){
            if(focusData.value.focus.length<=1){
                block.focus=true
            }else{
                block.focus=!block.focus
            }
        }else{
            if(!block.focus){
                clearBlockFocus()
                block.focus=true // 清空其他人的状态
            }
        }
        selectIndex.value=index
        callback(e)
    }
    const focusData=computed(()=>{
        let focus=[]
        let unfocused=[]
        data.value.blocks.forEach(block=>(block.focus?focus:unfocused).push(block))
        return {focus,unfocused}
    })
    const containerMouseDown=()=>{
        clearBlockFocus()
    }
    return {
        focusData,
        containerMouseDown,
        blockMousedown,
        lastSelectBlock
    }
}