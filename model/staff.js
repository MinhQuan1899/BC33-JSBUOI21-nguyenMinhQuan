function Staff(account, name, email, password, wdate, salary, position, wtime) {
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.wdate = wdate;
    this.salary = salary;
    this.position = position;
    this.wtime = wtime;
  
    this.calcGPA = function () {
      return (Number(this.salary) * Number(this.wtime));
    };
  }