import { defineStore } from 'pinia'

const useCounterStore =defineStore('counter',{
    state:()=>({
        counter:100
    }),
    getters:{
        doubleCounter(state){
            return state.counter
        }
    },
    actions:{
        changeCounterAction(newCounter:any){
            this.counter=newCounter
        }
    }
})
export default useCounterStore