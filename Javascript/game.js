let totalTables = 0
let totalTips = 0
let totalMistakes = 0
let tableInterval
let playBtn
let curr_track = document.createElement('audio') 

function startGame(e) {
  if (e.target.innerText === "Play Again") {
      clearOldGame()
      resetTimer()
    }
    formatGameSidebar(e)
    startTimer()
    selectTable()
    playMusic()
    tableInterval = setInterval(selectTable, 18000)
}

function playMusic() {
  let tracklist = [{path: "yummy.m4a"}]
  curr_track.src = tracklist[0].path
  curr_track.load()
  curr_track.play()
}

function formatGameSidebar(e) {
  //Update Sidebar
  let userArea = document.getElementById('user-info')
  userArea.style.marginTop = "-10px"
  userArea.children[1].style.marginTop = "25px"
  userArea.children[1].style.marginBottom = "10px"
  playBtn = e.target
  playBtn.style.display = "none"
  let highScores = document.getElementById('high-scores')
  highScores.style.display = "none"
  const gameDisplay = document.querySelector('.restaurant')
  gameDisplay.style.display = "inline-block"

  //Game Header
  const gameHeader = document.createElement("h4")
  gameHeader.innerText = "Current Game"
  gameHeader.style.textAlign = "center"
    
  //Game Tips
  const gameTips = document.createElement("p")
  gameTips.id = "tipCount"
  gameTips.style.marginTop = "5px"
  gameTips.style.marginBottom = "5px"
  gameTips.style.fontSize = "24px"
  gameTips.style.textAlign = "justify"
  gameTips.innerText = `Tips: $0`

  //Game Tables Served
  const gameTablesServed = document.createElement("p")
  gameTablesServed.id = "tableCount"
  gameTablesServed.style.marginTop = "5px"
  gameTablesServed.style.marginBottom = "5px"
  gameTablesServed.style.fontSize = "24px"
  gameTablesServed.style.textAlign = "justify"
  gameTablesServed.innerText = `Tables Served: 0`

  //Game Mistakes
  const gameMistakes = document.createElement("p")
  gameMistakes.id = "mistakes"
  gameMistakes.style.marginTop = "5px"
  gameMistakes.style.marginBottom = "5px"
  gameMistakes.style.fontSize = "24px"
  gameMistakes.style.textAlign = "justify"
  gameMistakes.innerText = `Mistakes: 0`

  //Game Timer Setup  
  const gameDuration = document.createElement("p")
  const timerMilisec = document.createElement("span")
  timerMilisec.id = "milisec"
  timerMilisec.innerText = "00"
  const timerSec = document.createElement("span")
  timerSec.id = "sec"
  timerSec.innerText = "00:"
  const timerMinute = document.createElement("span")
  timerMinute.id = "min"
  timerMinute.innerText = "00:"
  gameDuration.innerText = "Time: "
  gameDuration.style.fontSize = "24px"
  gameDuration.style.textAlign = "justify"
  gameDuration.style.marginLeft = "0px"
  gameDuration.style.marginBottom = "5px"
  gameDuration.style.marginTop = "15px"
  gameDuration.append(timerMinute)
  gameDuration.append(timerSec)
  gameDuration.append(timerMilisec)
  
  let currentGameDiv = document.createElement('div')
  currentGameDiv.id = "current-game"
  currentGameDiv.style.paddingBottom = "25px"
  currentGameDiv.prepend(gameMistakes)
  currentGameDiv.prepend(gameTablesServed)
  currentGameDiv.prepend(gameTips)
  currentGameDiv.prepend(gameDuration)
  currentGameDiv.prepend(gameHeader)
  userArea.append(currentGameDiv)
  userArea.insertBefore(currentGameDiv, userArea.children[1].nextSibling)
}

// Timer Function
let x

function startTimer() {
    x = setInterval(timer, 10);
  } 

  function stopTimer() {
    clearInterval(x);
  }

    let milisec = 0;
    let sec = 0; 
    let min = 0;

    let miliSecOut = 0;
    let secOut = 0;
    let minOut = 0;

function timer() {
  miliSecOut = checkTime(milisec);
  secOut = checkTime(sec);
  minOut = checkTime(min);

  milisec = ++milisec;

  if (milisec === 100) {
    milisec = 0;
    sec = ++sec;
  }

  if (sec == 60) {
    min = ++min;
    sec = 0;
  }

  document.getElementById("milisec").innerHTML = miliSecOut;
  document.getElementById("sec").innerHTML = secOut + ".";
  document.getElementById("min").innerHTML = minOut + ":";
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function resetTimer() {

  milisec = 0;
  sec = 0;
  min = 0

  document.getElementById("milisec").innerHTML = "00";
  document.getElementById("sec").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";

}

let TABLES = [1, 2, 3, 4, 5, 6, 7, 8]

function selectTable() {
    let randomNum = Math.floor(Math.random() * TABLES.length)
    table = TABLES[randomNum]
    TABLES.splice(randomNum, 1)
    const tableText = document.getElementById(`table-${table}`).children[0]

    if (tableText.innerText === "") {
      newCustomer = selectCustomer()
      tableText.innerText = newCustomer.name
      customerOrder(table, newCustomer)
    } else {
      orderMoreorRequestCheck(tableText)
    }
}

function orderMoreorRequestCheck(tableText) {
  let customer1 = Customer.all.find(e => e.name === tableText.innerText)
  let completedOrders = Table.all[table - 1].orders
  if (completedOrders.length >= 1) {
      let chance = Math.ceil(Math.random() * 2)
      if (chance === 1) {
         customerOrder(table, customer1) 
      }
      if (chance === 2) {
          let tableContent = document.getElementById(`table-${table}-content`).firstChild
          tableContent.innerText = "✍️"
      }
  }
}

function selectCustomer() {
    let customer = Customer.all[Math.floor(Math.random() * 12)]
    return customer
}

function addMistakes() {
  thisGameMistakes = document.getElementById('mistakes')
  thisGameMistakes.innerText = `Mistakes: ${totalMistakes+=1}`
  checkGameOver()
}

function checkGameOver() {
  if (totalMistakes >= 3) {
    stopTimer()
    clearInterval(tableInterval)
    clearInterval(orderInterval)
    recordUserScore()
    fetchHighScores()
    let table1 = document.getElementById('table-1-content').children[0]
  let table2 = document.getElementById('table-2-content').children[0]
  let table3 = document.getElementById('table-3-content').children[0]
  let table4 = document.getElementById('table-4-content').children[0]
  let table5 = document.getElementById('table-5-content').children[0]
  let table6 = document.getElementById('table-6-content').children[0]
  let table7 = document.getElementById('table-7-content').children[0]
  let table8 = document.getElementById('table-8-content').children[0]
  table1.innerText = "#1"
  table2.innerText = "#2"
  table3.innerText = "#3"
  table4.innerText = "#4"
  table5.innerText = "#5"
  table6.innerText = "#6"
  table7.innerText = "#7"
  table8.innerText = "#8"
    playBtn.style.display = "block"
    playBtn.innerText = "Play Again"
  
    Swal.fire({
      icon: "error",
      title: "You're Fired",
      html: `<p>Ooops! Sorry ${currentUser}, you made too many mistakes!</p><br><h4>Your final Score:</h4><br>Tips: $${totalTips}<br>Tables Served: ${totalTables}<br>Final Time: ${finalMin + finalSec + finalMilisec}`
    }).then((result) => {
      if (result.isConfirmed) {
        curr_track.pause()
      }
    })
  }
}

function addTipsforClosedTable(moneyTable, tableContent) {
  tableContent.innerText = `#${moneyTable.number}`
  paidTableText = document.getElementById(`table-${moneyTable.number}`).children[0]
  paidTableText.innerText = ""
  calculateTotalTips(moneyTable)
  moneyTable.orders = []
}

function payWithCashOrCard(tableContent) {
  let chance = Math.ceil(Math.random() * 2)
  if (chance === 1) {
    tableContent.innerText = "💳"
  }
  if (chance === 2) {
    tableContent.innerText = "💵"
  }
}

function rectifyCheck(formValues) {
  if (formValues[0].charAt(0) !== "S") {
    let checkTable = Table.all.find(t => t.number === parseInt(formValues[0].charAt(0)))
    let tableContent = document.getElementById(`table-${checkTable.number}-content`).firstChild
    if (tableContent.innerText === "✍️") {
        Swal.fire({
            icon: "success",
            text: `The check has been delivered for table #${checkTable.number}`
        })
        setTimeout(payWithCashOrCard.bind(null, tableContent), randomInteger(10000, 20000))
    } else {
        Swal.fire({
            icon: "error",
            text: `Ooops! Table #${checkTable.number} did not request the check yet!`
        })
        addMistakes()
        }
}
}

function rectifyPayment(formValues) {
  if (formValues[1].charAt(0) !== "S") {
    let moneyTable = Table.all.find(t => t.number === parseInt(formValues[1].charAt(0)))
    let tableContent = document.getElementById(`table-${moneyTable.number}-content`).firstChild
    if ((tableContent.innerText === "💵") || (tableContent.innerText === "💳")) {
        Swal.fire({
            icon: "success",
            text: `Congratulations, table #${moneyTable.number} has closed out!`
        })
        addTipsforClosedTable(moneyTable, tableContent)
        addTableServed()
        TABLES.push(moneyTable.number)
        
    } else {
        Swal.fire({
            icon: "error",
            text: `Ooops! Table #${moneyTable.number} has not paid yet!`
        })
        addMistakes()
    }
}
}

function removeOrder(tableOrderFilled, thisTable, thisTableOrder) {
  tableOrderFilled.innerText = `#${thisTable}`
  TABLES.push(thisTable)
  Table.all.find(table => table.number === thisTable).orders.push(thisTableOrder)
}

function displayOrderToTable(thisTableOrder, tableOrderFilled) {
  let emojiOrder = ""
  if (thisTableOrder.items.length === 1) {
    addTips()
    tableOrderFilled.innerText = thisTableOrder.items[0].icon
  } else {
    thisTableOrder.items.forEach(item => emojiOrder += `${item.icon}`)
    tableOrderFilled.innerText = emojiOrder
    let tablesServed
    let tipsEarned 
    addTips()
  }
}

function addTips() {
  tipsEarned = document.getElementById('tipCount')
  tipsEarned.innerText = `Tips: $${totalTips+=1}`
}

function addTableServed() {
  tablesServed = document.getElementById('tableCount')
  tablesServed.innerText = `Tables Served: ${totalTables+=1}`
}

function clearOldGame() {
  totalTables = 0
  totalTips = 0
  totalMistakes = 0

  let oldGameDiv = document.getElementById('current-game')
  oldGameDiv.style.display = "none"
  oldGameDiv.id = "game-over"
  
  let table1CustomerName = document.getElementById('table-1').children[0]
  let table2CustomerName = document.getElementById('table-2').children[0]
  let table3CustomerName = document.getElementById('table-3').children[0]
  let table4CustomerName = document.getElementById('table-4').children[0]
  let table5CustomerName = document.getElementById('table-5').children[0]
  let table6CustomerName = document.getElementById('table-6').children[0]
  let table7CustomerName = document.getElementById('table-7').children[0]
  let table8CustomerName = document.getElementById('table-8').children[0]
  table1CustomerName.innerText = ""
  table2CustomerName.innerText = ""
  table3CustomerName.innerText = ""
  table4CustomerName.innerText = ""
  table5CustomerName.innerText = ""
  table6CustomerName.innerText = ""
  table7CustomerName.innerText = ""
  table8CustomerName.innerText = ""
}