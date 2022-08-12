var staffList = [];

// lấy thông tin input
function createStaff() {
    // 1. lấy thông tin từ input
    var staffAccount = document.getElementById("tknv").value;
    var staffName = document.getElementById("name").value;
    var staffEmail = document.getElementById("email").value;
    var staffPassword = document.getElementById("password").value;
    var staffWdate = document.getElementById("datepicker").value;
    var staffSalary = document.getElementById("luongCB").value;
    var staffPosition = document.getElementById("chucvu").value;
    var staffWtime = document.getElementById("gioLam").value;

// tạo đối tượng nhân viên
var staff = new Staff(
    staffAccount,
    staffName,
    staffEmail,
    staffPassword,
    staffWdate,
    staffSalary,
    staffPosition,
    staffWtime
);

console.log(staff);



 // 3. push đối tượng sinh viên vào danh sách
 staffList.push(staff);
   //Gọi hàm tạo table sau khi thêm 1 sinh viên mới vào
  // console.table(studentList); 
  renderStaffList(staffList);

  //gọi hàm lưu vào localstorage sau khi thêm sinh viên
  saveLocalStorage(staffList, 'arrNV');
}

/**
 * Đây là hàm nhận vào 1 mảng sinh viên object ([{},{},{}]) và trả về 1 htmlString
 * @param {*} arrNV : [{},{},{}] tham số là arr các object sinh viên
 * @return kết quả trả về là 1 string HTML các thẻ <tr></tr>
 */
 function renderStaffList(arrNV) { //input : ??? [{maSinhVien:'1',tenSinhVien:'A',...},{maSinhVien:'2',tenSinhVien:'B',...},{maSinhVien:'3',tenSinhVien:'C',...}]
    var output = '';
    for (var index = 0; index < arrNV.length; index++) {
      var obNhanvien = arrNV[index];
      obNhanvien.calcGPA = function () {
        return (Number(this.salary) * Number(this.wtime));
      };
      var trNV = `
          <tr>
            <td>${obNhanvien.account}</td>
            <td>${obNhanvien.name}</td>
            <td>${obNhanvien.email}</td>
            <td>${obNhanvien.wdate}</td>
            <td>${obNhanvien.position}</td>
            <td>${obNhanvien.calcGPA()}</td>
            <td>${obNhanvien.classify}</td>
            <td>
              <button class="btn btn-danger" onclick="delStaff('${obNhanvien.account}')">Del</button>
              <button class="btn btn-primary" onclick="editStaff('${obNhanvien.account}')">Update</button>
            </td>
          </tr>
        `;
  
      output += trNV;
    }
    document.querySelector('tbody').innerHTML = output;
    return output;
  }

  //studentList = [{1},{2},{3}]
function editStaff(accountClick) {
  var nvEdit = null;
  for (var index = 0; index < staffList.length; index++) {
    if (staffList[index].account == accountClick) {
      //Tại vị trí này tìm thấy idClick = id object trong mảng
      nvEdit = staffList[index];
      break;
    }
  }
  if (nvEdit !== null) {
    //Đưa dữ liệu lên các control input
    document.querySelector('#tknv').value = nvEdit.id;
    document.querySelector('#name').value = nvEdit.name;
    document.querySelector('#email').value = nvEdit.email;
    document.querySelector('#password').value = nvEdit.password;
    document.querySelector('#datepicker').value = nvEdit.wdate;
    document.querySelector('#luongCB').value = nvEdit.salary;
    document.querySelector('#chucvu').value = nvEdit.position;
    document.querySelector('#gioLam').value = nvEdit.wtime;
  }
}



  function delStaff(accountClick) { // input id: giá trị người dùng click
    //output: index    //                 0   1   2
    var indexDel = -1; // 
    for (var index = staffList.length - 1; index >= 0; index--) {
      //Mỗi lần duyệt lấy ra 1 phần tử của mảng so với input người dùng click
      if (staffList[index].account == accountClick) {
        // indexDel = index; //Lưu lại vị trí id click = nhan vien có mã trùng với accountClick
        // break; //thoát ra khỏi vòng lặp
        staffList.splice(index, 1);
      }
    }
    renderStaffList(staffList);
  
    // saveLocalStorage(studentList, 'arrSV');
    // if (indexDel !== -1) { //tìm thấy
    //   studentList.splice(indexDel, 1);
    //   //Gọi lại hàm render table mới
    //   //Lưu danh sách sau khi xoá vào storage
    // }
  }

//Khi người dùng thay đổi sau đó bấm nút update 
function updateStaff() {
  var nvUpdate = new Staff();
  nvUpdate.account = document.querySelector('#tknv').value;
  nvUpdate.name = document.querySelector('#name').value;
  nvUpdate.email = document.querySelector('#email').value;
  nvUpdate.password = document.querySelector('#password').value;
  nvUpdate.wdate = document.querySelector('#datepicker').value;
  nvUpdate.salary = document.querySelector('#luongCB').value;
  nvUpdate.position = document.querySelector('#chucvu').value;
  nvUpdate.wtime = document.querySelector('#gioLam').value;
  console.log(nvUpdate);
  //Duyệt qua từng object trong studentList tìm ra vị trí của object cần thay đổi
  //                 0      1      2
  //studentList = [{id:1},{id:2},{id:3}]
  let indexEdit = -1;
  for (var index = 0; index < staffList.length; index++) {
    if (staffList[index].account === nvUpdate.account) {
      indexEdit = index; //1
      break;
    }
  }
  if (indexEdit !== -1) {
    //Nếu tìm thấy vị trí trong mảng thì lấy object trong mảng gán lại = object trên giao diện người dùng thay đổi
    // studentList[indexEdit] = svUpdate;
    staffList[indexEdit].name = nvUpdate.name;
    staffList[indexEdit].email = nvUpdate.email;
    staffList[indexEdit].password = nvUpdate.password;
    staffList[indexEdit].wdate = nvUpdate.wdate;
    staffList[indexEdit].salary = nvUpdate.salary;
    staffList[indexEdit].position = nvUpdate.position;
    staffList[indexEdit].wtime = nvUpdate.wtime;
    //Gọi hàm rendertable truyền cho hàm mảng mới
    renderStaffList(staffList);
  }
}