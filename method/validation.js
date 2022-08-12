function kiemTraRong(value, selectorError, name) {
    //output: true | false
    // var valid = true;
    if (value === '') {
        // alert('tài khoản nhân viên không được bỏ trống !');
        document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống';
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
}