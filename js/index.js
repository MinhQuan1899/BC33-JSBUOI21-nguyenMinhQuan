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
              <button class="btn btn-danger" onclick="delStudent('${obNhanvien.account}')">Del</button>
              <button class="btn btn-primary" onclick="editStudent('${obNhanvien.account}')">Update</button>
            </td>
          </tr>
        `;
  
      output += trNV;
    }
    document.querySelector('tbody').innerHTML = output;
    return output;
  }
