import { menuArray } from './data'

const itemsSection = document.getElementById('item-section')
const orderSection = document.getElementById('order-section')
const orderCart=[]
document.addEventListener('submit',function(e) {
    e.preventDefault()
    handlePayBtnClick()
})
document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        console.log(e.target.dataset.add)
        handleAddClick(Number(e.target.dataset.add)) 
    }
    else if(e.target.dataset.remove){
        handleRemoveClick(Number(e.target.dataset.remove))
    }
    else if(e.target.id==='order-btn'){
        handleOrderBtnClick()
    }
    else if(e.target.id === 'pay1-btn'){
        handlePayBtnClick()
    }
})
function render () {
    itemsSection.innerHTML = menuArray.map((el) => {
        const {
            id,
            name,
            emoji,
            price
        } = el
        console.log(el)
        return `<div class="item" id="item" data-item="${id}">
          <div class="leftchunk" >
           <div class="item-image">
            ${emoji}
            </div>
            <div class="item-description">
                <span class="item-name">${name}</span>
                <span class="item-ingredients">${el.ingredients.join(',')}</span>
                <span class="item-price">$${price}</span>
            </div> 
            </div>
            <button class="item-add" data-add=${id}>+</button>       
        </div>`
    }).join('')
    if(orderCart.length>0) {
        let total=0
        let cartindex=0
        let orderHTML=`<div class="orderheader">Your order</div>`
        orderHTML+=orderCart.map(item => {
                const {
                    id,
                    name,
                    price
                } = item
                console.log(`cartindex: ${cartindex}`)
                total+=price
     //           console.log(total)
                    return `
                <div class="itemorderblock">
                    <div class="choiceitem">${name}<span data-remove="${cartindex++}" class="removebtn">remove</span></div>
                    <div class="priceitem">$${price}</div>
                </div>`
        }).join('')
            orderHTML+=`<div class="ordertotalblock">      
        <div class="ordertotal">Total price:</div><div class="priceitem">$${total}</div>
        </div>
        <div class="buttonholder"><button id="order-btn" class="greenbutton">Complete order</button></div>`
        orderSection.innerHTML=orderHTML
        //orderHTML
    } else { orderSection.innerHTML=''}
}
const orderBtn = document.getElementById("order-btn")
function handleAddClick(itemid) {
    const addedItem = menuArray.filter((el) => el.id === itemid)[0]
        orderCart.push(addedItem)
        render()
} 
function handleRemoveClick(itemid) {
        orderCart.splice(itemid,1)
        render()
} 
function handleOrderBtnClick() {
    document.getElementById('paymentmodal').style.display='block'
}

function handlePayBtnClick() {
    document.getElementById('paymentmodal').style.display='none'
    orderSection.innerHTML=`<div class="orderfinish" id="orderfinish">Thanks, James! Your order is on its way!</div>`
}

render()