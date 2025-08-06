// Problem 1
var employee1 = {
    name: "Sam",
    department: "Tech",
    position: "Manager",
    salary: 40000,
    raiseEligible: true
  };
  
  var employee2 = {
    name: "Mary",
    department: "Finance",
    position: "Trainee",
    salary: 18500,
    raiseEligible: true
  };
  
  var employee3 = {
    name: "Bill",
    department: "HR",
    position: "Executive",
    salary: 21200,
    raiseEligible: false
  };
  
  console.log("Problem 1 Answer:", employee1, employee2, employee3);
  
  // Problem 2
  var company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: [employee1, employee2, employee3]
  };
  
  console.log("Problem 2 Answer:", company);
  
  // Problem 3
  var employee4 = {
    name: "Anna",
    department: "Tech",
    position: "Executive",
    salary: 25600,
    raiseEligible: false
  };
  
  company.employees.push(employee4);
  
  console.log("Problem 3 Answer:", company);
  
  // Problem 4: Total salary
  var totalSalary = 0;
  for (var i = 0; i < company.employees.length; i++) {
    totalSalary = totalSalary + company.employees[i].salary;
  }
  
  console.log("Problem 4 Answer: Total Salary =", totalSalary);
  
  // Problem 5: Give raises
  for (var i = 0; i < company.employees.length; i++) {
    var emp = company.employees[i];
    if (emp.raiseEligible === true) {
      emp.salary = emp.salary * 1.1;
      emp.raiseEligible = false;
    }
  }
  
  console.log("Problem 5 Answer:", company);
  
  // Problem 6: Work from home
  var workFromHomeList = ["Anna", "Sam"];
  
  for (var i = 0; i < company.employees.length; i++) {
    var emp = company.employees[i];
    var isWFH = false;
  
    for (var j = 0; j < workFromHomeList.length; j++) {
      if (emp.firstName === workFromHomeList[j]) {
        isWFH = true;
      }
    }
  
    emp.wfh = isWFH;
  }
  
  console.log("Problem 6 Answer:", company);