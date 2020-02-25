const readlineSync = require('readline-sync');
let account_created = false;
let create_account_at_start = true;
let given_id2;
let logged_in = false;
// let accept_funds_amount = 0;
let request_amount = 0;

const account = {
  name : null,
  password : null,
  id : null,
  balance : 200,
  fund_request_obj : fund_requests = [100]
};

const account2 = {
  name : "John",
  password : "p",
  id : 2,
  balance : 100,
  fund_request_obj : fund_requests = [50]
};

account2["fund_request_obj"].push(request_amount);
console.log(account2["fund_request_obj"]);

let all_users = [account2, account];
let all_user_json = JSON.stringify(all_users);
// console.log(`all_users_json data: ${all_user_json}`);
all_users.forEach(element => console.log(element));

const helpF = () => {
  console.log("Here’s a list of commands you can use! ");
  console.log("---------------------------------------");
  console.log("Accounts:");
  console.log("---------");
  console.log("create_account or ca");
  console.log("close_account or cla");
  console.log("modify_account or ma");
  console.log("does_account_exist or dae");
  console.log("log_in");
  console.log("");
  console.log("Funds:");
  console.log("------");
  console.log("withdraw_funds or wf");
  console.log("deposit_funds or df");
  console.log("transfer_funds or tf");
  console.log("");
  console.log("Requests:");
  console.log("--------");
  console.log("request_funds or rf");
  console.log("funds_requests or fr");
  console.log("accept_fund_request or afr");
  console.log("-----------------------------------------")
  command = readlineSync.question();
  commandsF(command);
}

const id_comparisonF = () => {
  given_id2 = readlineSync.question("ID:");
  let result = all_users.find(obj => parseInt(obj.id) === parseInt(given_id2));
  while(!result) {
    given_id2 = readlineSync.question("Mhmm, unfortunately an account with that ID does not exist. try again ");
    result = all_users.find(obj => parseInt(obj.id) === parseInt(given_id2));
  }
}

const create_accountF = () => {
  account.name = readlineSync.question("So you want to create a new account! Let’s start with the easy question. What is your name? ");
  while(account.name.length === 0) {
    account.name = readlineSync.question("name must be at least one character long. Try again ");
  }
  console.log(`Hey ${account.name} It’s great to have you as a client.`);
  console.log("We’re happy to have you as a customer, and we want to ensure that your money is safe with us. ");
  let generated_id = Math.floor(Math.random() * 100) + 1;
  let result = all_users.find(obj => parseInt(obj.id) === generated_id);
  while(result) {
    generated_id = Math.floor(Math.random() * 100) + 1;
    result = all_users.find(obj => parseInt(obj.id) === parseInt(given_id));
  }
  account.id = generated_id;
  console.log(`your id is ${account.id}`);
  account.password = readlineSync.question("Give us a password, which gives only you the access to your account. ");
  while(account.password.length === 0) {
    account.name = readlineSync.question("password must be at least one character long. Try again ");
  }
  account_created = true;
  console.log("User account is created");
  all_users.push(account);
  all_user_json = JSON.stringify(all_users);
  // console.log(`all_users_json data: ${all_user_json}`);
  if(create_account_at_start) {
    helpF();
  }
}

const log_in = () => {
  while(!account_created) {
    create_account_at_start = false;
    console.log("you need to create account first");
    create_accountF();
  }
  console.log("So you want to log in?");
  id_checkF();
  console.log("Okay, we found an account with that ID.")
  password_checkF();
  console.log("you are logged in")
  logged_in = true;
} 

const funds_requestsF = () => {
  console.log("Here’s all the requests that are out for your funds.");
  console.log(`- ${account2["fund_request_obj"]} euros for user ID of ${account2.id}.`);
}

const deposit_fundsF = () => {
   while(!account_created) {
     create_account_at_start = false;
    console.log("You need to create account first");
    create_accountF();
  }
  console.log("you need to give us your id that we know its you");
  id_checkF();
  password_checkF();
  let deposit_funds = readlineSync.question("How much cash do you want to deposit to get started with your account? (10€ is the minimum) ");
  while(deposit_funds < 10) {
    deposit_funds= readlineSync.question("we can’t open an account for such a small account. Do you have any more cash with you? ");
  }
    account.balance += parseInt(deposit_funds);
    console.log(`Great ${account.name} You now have an account (ID: ${account.id} with balances of ${account.balance}€)`);
    helpF();
}

const password_checkF = () => {
  console.log("You will need to insert your password so we can validate it’s actually you ");
  given_password = readlineSync.question("password: ");
  while (given_password !== account.password) {
    given_password = readlineSync.question("Ah, there must by a typo. Try typing it again.");
  }
  console.log(`Awesome, we validated you ${account.name}!`);
}

id_checkF = (given_id) => {
  given_id = readlineSync.question("ID: ");
  while(parseInt(given_id) !== parseInt(account.id)) {
    given_id = readlineSync.question("Mhmm, unfortunately an account with that ID does not exist. Try again. ");
  }
}

const id_and_password_checkF = () => {
  given_id = readlineSync.question("ID: ");
  given_password = readlineSync.question("Password: ");
  while(parseInt(given_id) !== parseInt(account.id) && parseInt(given_password) !== parseInt(account.id)) {
    given_id = readlineSync.question("Account doesen't exist. Try again. ");  
  }
  console.log("You will need to insert your password so we can validate it’s actually you ");
  given_password = readlineSync.question("password: ");
  while (given_password !== account.password) {
    given_password = readlineSync.question("Ah, there must by a typo. Try typing it again.");
  }
  console.log(`Awesome, we validated you ${account.name}!`);
}

const accept_fund_requestF = () => {
  let accept_funds_id = readlineSync.question("Do you want to accept someones fund request? Give us their ID");
  let result = all_users.find(obj => parseInt(obj.id) === parseInt(accept_funds_id));
    while(!result) {
      accept_funds_id = readlineSync.question("Mhmm, unfortunately there’s no request for your funds with that account ID. Try again?");
      result = all_users.find(obj => parseInt(obj.id) === parseInt(accept_funds_id));
    }
    let accept_funds_q = readlineSync.question(`Okay, we found a request for your funds of ${account.balance} euros. Type "yes" or "no" to accept or deny this request. `);
    while (accept_funds_q !== "yes" && accept_funds_q !== "no") {
      accept_funds_q = readlineSync.question('type "yes" or "no" to accept or deny request ');
    }
    if(accept_funds_q === "yes") {
      if(parseInt(account.balance) >= parseInt(request_amount)) {
        account.balance -= parseInt(request_amount);
        account["fund_request_obj"].push(request_amount);
        console.log(`Good! Now these funds has been transferred to the account with ID ${accept_funds_id}.`);
        helpF();
      }
      else {
        console.log("Unfortunately you don’t have the funds for a request like this!" );
        helpF();
      }
    }
  else{
    console.log("request denied");
    helpF();
  }
}

const withdraw_fundsF = () => {
  while(!account_created) {
    create_account_at_start = false;
    console.log("you need to create account first");
    create_accountF();
  }
    password_checkF();
    console.log("Okay, let’s slide these binary treats in to someone elses pockets. Let’s start with your account ID. ");
    id_checkF();
    let withdraw_funds = readlineSync.question("Okay, let’s whip up some cash for you from these ones and zeroes. ");
    while(parseInt(account.balance) < parseInt(withdraw_funds)) {
      withdraw_funds = readlineSync.question(`Unfortunately you don’t have the balance for that. Let’s try a smaller amount. `);
    }
    account.balance -= parseInt(withdraw_funds);
    console.log(`Awesome, you can now enjoy your ${withdraw_funds} in cash! There’s still ${account.balance} in your account, safe with us.`);
    helpF();
}

const transfer_fundsF = () => {
  while(!account_created) {
    create_account_at_start = false;
    console.log("you need to create account first");
    create_accountF();
  }
    password_checkF();  
    console.log("Okay, let’s slide these binary treats in to someone elses pockets. Let’s start with your account ID. ");
    id_checkF();
      console.log("Okay, we found an account with that ID.")
        let transfer_amount = readlineSync.question(`How much money do you want to transfer? (Current balance: ${account.balance}€) `);
        while (parseInt(transfer_amount) > parseInt(account.balance)) {
          transfer_amount = readlineSync.question("you don't have the money for the transfer. Try again ");
        }
          console.log("Awesome, we can do that. What is the ID of the account you want to transfer these funds into? ");
          id_comparisonF();
          account.balance -= parseInt(transfer_amount);
          console.log(`Awesome. We sent ${transfer_amount}€ to an account with the ID of ${given_id2} `);
          helpF();
}

const modify_accountF = () => {
  while(!account_created) {
    console.log("You dont even have an account. Returning to help menu ");
    helpF();
    }
      console.log("Mhmm, you want to modify an accounts stored holder name. We can definitely do that! Let’s start validating you with your ID! ");
      id_checkF()
      password_checkF();
      let new_name = readlineSync.question(`Awesome, we validated you ${account.name}! What is the new name for the account holder? `);
      while(new_name === account.name) {
        new_name = readlineSync.question("Mhmm, I’m quite sure this is the same name. Try typing it out again. ");
      }
      account.name = new_name;
      console.log(`Ah, there we go. We will address you as ${account.name} from now on. `);
      helpF();
}

const does_account_existF = () => {
  let given_id = readlineSync.question("Mhmm, you want to check if an account with an ID exists. Let’s do it! Give us the ID and we’ll check " );
  let result = all_users.find(obj => parseInt(obj.id) === parseInt(given_id));
  while(!result) {
    given_id = readlineSync.question("Mhmm, unfortunately an account with that ID does not exist. try again ");
    result = all_users.find(obj => parseInt(obj.id) === parseInt(given_id));
  }
  console.log("Awesome! This account actually exists. You should confirm with the owner that this account is actually his ");
  helpF();
}

const request_fundsF = () => {
  let request_id = readlineSync.question("So you want request funds from someone? Give us their ID.");
  let result = all_users.find(obj => parseInt(obj.id) === parseInt(request_id));
  while(!result) {
    request_id = readlineSync.question("Mhmm, unfortunately an account with that ID does not exist. try again ");
    result = all_users.find(obj => parseInt(obj.id) === parseInt(request_id));
  }
  request_amount = readlineSync.question("How much money do you want to request? ");
  account["fund_request_obj"].push(request_amount)
  console.log(`Awesome! We’ll request ${request_amount}€ from the user with ID ${request_id}.`);
  helpF();
}
  
const close_accountF = () => {
  log_in = false;
  console.log("closed account");
}
  
const start_upF = () => {
  let command = readlineSync.question('Welcome to Buutti banking CLI! Hint: You can get help with the commands by typing “help” or "h". ');
  commandsF(command);
}

const commandsF = (command) => {
  switch(command) {
    case "help":
    case "h": 
      console.log("I’m glad to help you");
      helpF();
    break;
    case "create_account":
    case "ca":
      create_accountF();
      break;
    case "log_in":
    case "li":
      log_in();
      break;
    case "close_account":
    case "cla":
      close_accountF();
      break;
    case "modify_account":
    case "ma":
      modify_accountF();
      break;
    case "does_account_exist":
    case "dae":
      does_account_existF ();
      break;
    case "withdraw_funds":
    case "wf":
      withdraw_fundsF();
      break;
    case "deposit_funds":
    case "df":
      deposit_fundsF();
      break;
    case "transfer_funds":
    case "tf":
      transfer_fundsF();
      break;
    case "request_funds":
    case "rf":
      request_fundsF();
      break;
    case "funds_requests":
    case "fr":
      funds_requestsF();
      break;
    case "accept_fund_request":
    case "afr":
      accept_fund_requestF();
    default:
      command = readlineSync.question("Command not found. Try again ");
      commandsF(command);
  }
}

start_upF();