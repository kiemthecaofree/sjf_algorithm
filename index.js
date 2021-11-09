const processForm = document.getElementById("process__form");
const input__process__count = document.getElementById("input__process__count");
let btnResult = document.querySelector("#btn__result");
const btnSubmit = document.querySelector(".btn__submit");
const btn__err = document.querySelector(".btn__err");
const err = document.querySelector("#err");
const err__detail = document.querySelector(".err__detail");
const btn__bar = document.querySelector(".btn__bar");
const bar = document.querySelector(".bar");
const box__bar = document.querySelector(".box__bar");
const black__layer = document.querySelector(".black__layer");

btn__bar.addEventListener("click", () => {
  if (btn__bar.classList.contains("fa-bars")) {
    box__bar.classList.remove("to_left");
    box__bar.style.display = "flex";
    btn__bar.className = "fa fa-times btn__bar";
    black__layer.style.display = "block";
  } else {
    // box__bar.style.display = "none";
    box__bar.classList.add("to_left");
    btn__bar.className = "fa fa-bars btn__bar";
    black__layer.style.display = "none";
  }
});

btn__err.addEventListener("click", () => {
  err.style.display = 'none';
})

let processCount;
let ListArrClone = [];
let processTime = [];
let newArr = [];
let ListTamKhongDocQuyen = [];
let processPrint = [];
let check;
let timeBatDau;
let tpUutien; // Xét nếu ko có ptu 1 thi ko xet them


btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkCountProcessValueInput() === false){
    err.style.display = "flex";
    err__detail.innerHTML = "Số tiến trình nhập vào phải lớn hơn 0";
    return;
  } 
  let table__data__1 = document.querySelector(".table__data__1");
  table__data__1.innerHTML = "";
  table__data__1.style.display = "none";
  clearInputInfo();
  showInputInfo();
});

input__process__count.addEventListener("change", (e) => {
  processCount = e.target.value;
});

const clearInputInfo = () => {
  const clearInput = document.querySelector(".input__group");
  if (clearInput) clearInput.remove();
  const btnResult = document.querySelector("#btn__result");
  if (btnResult) btnResult.remove();
};

const showInputInfo = () => {
  input__container = document.querySelector("#input__container");
  let inputGroup = document.createElement("div");
  inputGroup.className = "input__group";
  input__container.appendChild(inputGroup);
  for (let i = 1; i <= processCount; i++) {
    let oneProcessInput = document.createElement("div");
    oneProcessInput.className = `process__info__input${i} process__info__input`;
    let p = document.createElement("p");
    p.innerHTML = `Nhập thông tin tiến trình ${i}: `;
    let label_1 = document.createElement("label");
    label_1.className = "process__name";
    label_1.innerHTML = `P${i}`;
    let input_1 = document.createElement("input");
    input_1.type = "text";
    input_1.value = `P${i}`;
    input_1.style.display = "none";
    let label_2 = document.createElement("label");
    label_2.innerHTML = `Nhập thời điểm vào RL${i}: `;
    label_2.className = "td__rl";
    let input_2 = document.createElement("input");
    input_2.type = "number";
    input_2.required = true;
    let label_3 = document.createElement("label");
    label_3.innerHTML = `Nhập thời gian xử lý P${i}: `;
    let input_3 = document.createElement("input");
    input_3.type = "number";
    input_3.required = true;

    let process__info = document.createElement("div");
    process__info.className = "process__info";
    oneProcessInput.appendChild(p);
    process__info.appendChild(label_1);
    process__info.appendChild(input_1);
    process__info.appendChild(label_2);
    process__info.appendChild(input_2);
    process__info.appendChild(label_3);
    process__info.appendChild(input_3);
    oneProcessInput.appendChild(process__info);
    inputGroup.appendChild(oneProcessInput);
  }

  let buttonResult = document.createElement("div");
  buttonResult.innerHTML = "IN KET QUA";
  buttonResult.id = "btn__result";
  input__container.appendChild(buttonResult);
  btnResult = document.querySelector("#btn__result");

  let div = document.createElement("div");
  div.className = "checkbox";
  div.innerHTML = `
            <p>Chọn:<p>
            <label for="male">Độc Quyền</label>
            <input class = "dq" type="radio" name="kieudocquyen" id="docquyen" value="docquyen" checked />
            <label for="female">Không Độc Quyền</label>
            <input class = "dq" type="radio" name="kieudocquyen" id="khongdocquyen" value="khongdocquyen" /> `;
  inputGroup.appendChild(div);

  btnResult.addEventListener("click", () => {
    getInputValue();
  });
};

const checkCountProcessValueInput = () => {
  if (Number(input__process__count.value) <= 0 || Number(input__process__count.value) >= 10000) {
    return false;
  }
  return true;
};

const checkProcessInfoInput = () => {
  const process__info = document.querySelectorAll(".process__info");
  let checkInput = true;
  for (let i of process__info) {
    x = i.childNodes[3].value;
    y = i.childNodes[5].value;
    if (
      x === "" ||
      y === "" ||
      x.length === 0 ||
      y.length === 0 ||
      Number(x) < 0 ||
      Number(y) < 0
    ) {
      if(x === "" || Number(x) === 0 || Number(x) < 0) 
        i.childNodes[3].style.borderColor = "red";
      else
        i.childNodes[3].style.borderColor = "#fff";
      if (y === "" || Number(y) === 0 || Number(y) < 0)
        i.childNodes[5].style.borderColor = "red";
      else
        i.childNodes[5].style.borderColor = "#fff";
      checkInput = false;
      err.style.display = "flex";
      err__detail.innerHTML = "Cần nhập đầy đủ, đúng các thông số tiến trình";
    }
    else{
      i.childNodes[3].style.borderColor = "#fff";
      i.childNodes[5].style.borderColor = "#fff";
    }
  }
  return checkInput;
};

// Create a Array
let ListArray = [];
let newArrCaseDQ = [];

const getInputValue = () => {
  ListArray = [];
  if (checkProcessInfoInput() === false) {
    return;
  }
  const process__info = document.querySelectorAll(".process__info");
  for (let i of process__info) {
    const x = [
      i.childNodes[1].value,
      Number(i.childNodes[3].value),
      Number(i.childNodes[5].value),
    ];
    ListArray.push(x);
  }
  sortTimeRLData();
  let cbox = document.querySelector(".dq:checked").value;
  if (cbox === 'docquyen')
    handleSJFDocQuyen();
  else
  {
    ListArrClone = [];
    processTime = [];
    newArr = [];
    ListTamKhongDocQuyen = [];
    processPrint = [];
    check = false;
    startKhongDocQuyen();
    xuLyTrungLap();
    printResultKDQ();
  }
};

const sortTimeRLData = () => {
  for (let i = 0; i < ListArray.length; i++) {
    for (let j = i + 1; j < ListArray.length; j++) {
      if (Number(ListArray[i][1]) > Number(ListArray[j][1])) {
        [ListArray[j], ListArray[i]] = [ListArray[i], ListArray[j]];
      } else if (Number(ListArray[i][1]) === Number(ListArray[j][1])) {
        if (Number(ListArray[i][2]) > Number(ListArray[j][2])) {
          [ListArray[j], ListArray[i]] = [ListArray[i], ListArray[j]];
        }
      }
    }
  }
};

const sortTimeHandleDQ = (newArrCaseDQ) => {

  let min = Number(ListArray[0][1]) + Number(ListArray[0][2]);

  for(let i = 0; i<newArrCaseDQ.length; i++)
  {
    for(let j = i+1; j<newArrCaseDQ.length; j++)
    {
      if((Number(newArrCaseDQ[i][1]) <= min && Number(newArrCaseDQ[j][1]) <= min) &&
      (Number(newArrCaseDQ[i][2]) > Number(newArrCaseDQ[j][2]) || ((Number(newArrCaseDQ[i][2]) === Number(newArrCaseDQ[j][2]))
      && newArrCaseDQ[i][0] > newArrCaseDQ[j][0])))
      {
        [newArrCaseDQ[j], newArrCaseDQ[i]] = [newArrCaseDQ[i], newArrCaseDQ[j]];
      }
    }
    min += Number(newArrCaseDQ[i][2]);
  }
};

const createTable = () => {
  let table__data__1 = document.querySelector(".table__data__1");
  table__data__1.style.display = "block";
  table__data__1.innerHTML = `
  <p id="data__name__1">
            <span class="data__title">Trình Tự Tiến Trình:</span>

        </p>
        <p id="data__time__1">
            <span class="data__title">Thời Gian: </span>
        </p>
        </p>
        <p id="average__time__1">
            <span class="data__title">Thời Gian Chờ Trung Bình: </span>
        </p>`;
}

// Xử lý trường hợp độc quyền
const handleSJFDocQuyen = () => {
  newArrCaseDQ = [];
  // Gán List cho mảng mới
  for (let i = 1; i < ListArray.length; i++) {
    newArrCaseDQ[i - 1] = ListArray[i];
  }
  sortTimeHandleDQ(newArrCaseDQ);
  printResultDQ();
};

const printResultDQ = () => {
  createTable();
  let time_out = 300;
  const data__name__1 = document.querySelector("#data__name__1");
  const data__time__1 = document.querySelector("#data__time__1");
  const average__time__1 = document.querySelector("#average__time__1");

  let span_1 = document.createElement("span");
  span_1.innerHTML = `${ListArray[0][0]}`;
  data__name__1.appendChild(span_1);

  let span_2 = document.createElement("span");
  span_2.innerHTML = `${ListArray[0][1]}`;
  data__time__1.appendChild(span_2);

  let times;
  let time_wait = 0;
  if (
    newArrCaseDQ.length !== 0 &&
    Number(ListArray[0][1]) + Number(ListArray[0][2]) <
      Number(newArrCaseDQ[0][1])
  )
    times = Number(newArrCaseDQ[0][1]);
  else if (
    newArrCaseDQ.length !== 0 &&
    Number(ListArray[0][1]) + Number(ListArray[0][2]) >=
      Number(newArrCaseDQ[0][1])
  )
    times = Number(Number(ListArray[0][1]) + Number(ListArray[0][2]));

  for (let i = 0; i < newArrCaseDQ.length; i++) {
    setTimeout(() => {
      const span_name = document.createElement("span");
      span_name.innerHTML = `${newArrCaseDQ[i][0]}`;
      data__name__1.appendChild(span_name);
      time_out += 300;
    }, time_out)
  }
  time_out = 300;
  for (let i = 0; i < newArrCaseDQ.length; i++) {
    setTimeout(() => {
      const span_time = document.createElement("span");
      span_time.innerHTML = `${Number(times)}`;
      data__time__1.appendChild(span_time);
      time_wait += Number(times) - Number(newArrCaseDQ[i][1]);

      if (
        newArrCaseDQ[i + 1] !== undefined &&
        Number(times) + Number(newArrCaseDQ[i][2]) <
          Number(newArrCaseDQ[i + 1][1])
      ) {
        times = Number(newArrCaseDQ[i + 1][1]);
      } else if (
        newArrCaseDQ[i + 1] !== undefined &&
        Number(times) + Number(newArrCaseDQ[i][2]) >=
          Number(newArrCaseDQ[i + 1][1])
      ) {
        times += Number(newArrCaseDQ[i][2]);
      }

      if (i === newArrCaseDQ.length - 1) {
        let span_3 = document.createElement("span");
        span_3.innerHTML = `${times}`;

        let span_4 = document.createElement("span");
        span_4.innerHTML = `${Number(time_wait) / ListArray.length}`;
        average__time__1.appendChild(span_4);
      }
    }, time_out);
    time_out += 300;
  }
};


const cloneArr = () => {
  let timetemp = ListArray[0][1];
  ListArrClone.push([]);
  ListArrClone[0][0] = ListArray[0][0];
  ListArrClone[0][1] = ListArray[0][1];
  ListTamKhongDocQuyen.push(ListArray[0]);

  for (let i = 1; i < ListArray.length; i++) {
    if (ListArray[i][1] !== timetemp) {
      ListTamKhongDocQuyen.push(ListArray[i]);
      timetemp = ListArray[i][1];
    }
    ListArrClone.push([]);
    ListArrClone[i][0] = ListArray[i][0];
    ListArrClone[i][1] = ListArray[i][1];
  }
}


const sapXepDoUuTien = () => {
  for (let i = 0; i < newArr.length; i++) {
    for (let j = i + 1; j < newArr.length; j++) {
      if (Number(newArr[i][2]) > Number(newArr[j][2])) {
        [newArr[j], newArr[i]] = [newArr[i], newArr[j]];
      } else if (Number(newArr[i][2]) === Number(newArr[j][2])) {
        if (Number(newArr[i][1]) > Number(newArr[j][1])) {
          [newArr[j], newArr[i]] = [newArr[i], newArr[j]];
        }
      }
    }
  }
};
const addNhungPhanTuCungGiaTri = (tientrinh) => {
  for (let i = 0; i < ListArray.length; i++) {
    if (ListArray[i][1] === tientrinh[1] && ListArray[i][0] !== tientrinh[0]) {
      newArr.push(ListArray[i]);
    }
  }
};

const xoaMotPhanTuKhoiListTam = (tientrinh) => {
  for (let i = 0; i < ListTamKhongDocQuyen.length; i++) {
    if (ListTamKhongDocQuyen[i][1] === tientrinh[1]) {
      ListTamKhongDocQuyen.splice(i, 1);
      break;
    }
  }
};

const xoaNhungPhanThuTheoDK = (tientrinh) => {
  for (let i = 0; i < ListArray.length; i++) {
    if (ListArray[i][1] <= tientrinh[1]) {
      ListArray.splice(i, 1);
      i = i - 1;
    }
  }
};

const handleCaseKhongDocQuyen = () => {
  for (let i = 0; i < ListTamKhongDocQuyen.length - 1; i++) {
    let temp = Number(ListTamKhongDocQuyen[i][2]) + Number(timeBatDau) - Number(tpUutien[1]);
    if (
      temp >= 0 &&
      Number(ListTamKhongDocQuyen[i][2]) - (Number(tpUutien[1]) - Number(timeBatDau)) <= Number(tpUutien[2])
    ) {
      // So sánh thời gian xử lý của M0 còn lại với tp ưu tiên
      // M0 ưu tiên hơn
      ListTamKhongDocQuyen[i][2] =
        Number(ListTamKhongDocQuyen[i][2]) - (Number(tpUutien[1]) - Number(timeBatDau)); // Cập nhật thời gian xử lý còn lại của M0

      processTime.push([ListTamKhongDocQuyen[i][0]]);
      processTime[processTime.length - 1].push(timeBatDau);

      timeBatDau += Number(tpUutien[1]) - Number(timeBatDau);
      // Đưa M1 vào Mảng và những phần tử cùng giá trị với M1
      // Xóa M1 khỏi ListTam và cập nhật vị trí bắt đầu = i - 1, và xét lại tpUutien

      if (ListTamKhongDocQuyen[i][2] !== 0) {
        newArr.push(tpUutien);
        addNhungPhanTuCungGiaTri(tpUutien);
        sapXepDoUuTien();
        xoaMotPhanTuKhoiListTam(tpUutien);
      }
      if (
        ListTamKhongDocQuyen[i + 1] !== undefined &&
        Number(ListTamKhongDocQuyen[i][2]) !== 0
      ) {
        tpUutien = ListTamKhongDocQuyen[i + 1]; // Xét lại thành phần ưu tiên
        i = i - 1; // Duyệt lại từ vị trí i
      } else if (
        ListTamKhongDocQuyen[i + 1] === undefined &&
        Number(ListTamKhongDocQuyen[i][2]) !== 0
      ) {
        // Chỉ còn lại M0
        newArr.push(ListTamKhongDocQuyen[i]);
        addNhungPhanTuCungGiaTri(ListTamKhongDocQuyen[i]);
        sapXepDoUuTien();
        check = true;
        break;
      }
      else if (
        ListTamKhongDocQuyen[i + 1] !== undefined &&
        ListTamKhongDocQuyen[i][2] === 0
      ) {
        // Đã xử lý hết thời gian M0 và còn trên 2 ptu
        let value_tam = ListTamKhongDocQuyen[i];
        addNhungPhanTuCungGiaTri(ListTamKhongDocQuyen[i]);
        xoaMotPhanTuKhoiListTam(ListTamKhongDocQuyen[i]);
        if (ListTamKhongDocQuyen[i + 1] !== undefined) {
          sapXepDoUuTien();
         if(newArr.length !== 0 && newArr[0][1] <= timeBatDau && newArr[0][2] < ListTamKhongDocQuyen[i][2])
          {
            newArr.push(ListTamKhongDocQuyen[i]);
            addNhungPhanTuCungGiaTri(ListTamKhongDocQuyen[i]);
            xoaMotPhanTuKhoiListTam(ListTamKhongDocQuyen[i]);
            xoaNhungPhanThuTheoDK(newArr[0]);
            ListTamKhongDocQuyen.unshift(newArr[0]);
            tpUutien = ListTamKhongDocQuyen[i + 1];
            newArr.shift();
            i = i - 1;
            xoaNhungPhanThuTheoDK(value_tam);
            // return;
          }
          else{
            tpUutien = ListTamKhongDocQuyen[i + 1]; // Xét lại thành phần ưu tiên
            i = i - 1; // Duyệt lại từ vị trí i
          }
        } else if (ListTamKhongDocQuyen[i + 1] === undefined) {
          newArr.push(ListTamKhongDocQuyen[i]);
          addNhungPhanTuCungGiaTri(ListTamKhongDocQuyen[i]);
          sapXepDoUuTien();
          check = true;
          break;
        }
      } else if (
        ListTamKhongDocQuyen[i + 1] === undefined &&
        ListTamKhongDocQuyen[i][2] === 0
      ) {
        // Đã xử lý hết thời gian M0 Chỉ còn lại 1 ptu
        newArr.push(ListTamKhongDocQuyen[i]);
        addNhungPhanTuCungGiaTri(ListTamKhongDocQuyen[i]);
        sapXepDoUuTien();
        check = true;
        break;
      }
    } else if (
      temp >= 0 &&
      ListTamKhongDocQuyen[i][2] - (tpUutien[1] - timeBatDau) > tpUutien[2]
    ) {
      // M1 ưu tiên hơn
      ListTamKhongDocQuyen[i][2] =
        ListTamKhongDocQuyen[i][2] - (tpUutien[1] - timeBatDau); // Cập nhật thời gian đã xử lý của M0
      // Đưa M0 vào Mảng và những phần tử cùng giá trị với M1
      newArr.push(ListTamKhongDocQuyen[i]);
      addNhungPhanTuCungGiaTri(ListTamKhongDocQuyen[i]);
      sapXepDoUuTien();

      processTime.push([ListTamKhongDocQuyen[i][0]]);
      processTime[processTime.length - 1].push(timeBatDau);

      timeBatDau += tpUutien[1] - timeBatDau;
      // Xóa M0
      xoaMotPhanTuKhoiListTam(ListTamKhongDocQuyen[i]);
      if (ListTamKhongDocQuyen[i + 1] === undefined) {
        newArr.push(tpUutien);
        addNhungPhanTuCungGiaTri(tpUutien);
        sapXepDoUuTien();
        check = true;
        break;
      } else if (ListTamKhongDocQuyen[i + 1] !== undefined) {
        tpUutien = ListTamKhongDocQuyen[i + 1];
        i = i - 1;
      }
    } else if (temp < 0) {
      let timeconlai = tpUutien[1] - (timeBatDau + ListTamKhongDocQuyen[i][2]);

      processTime.push([ListTamKhongDocQuyen[i][0]]);
      processTime[processTime.length - 1].push(timeBatDau);
      let timetam = timeBatDau + ListTamKhongDocQuyen[i][2]; // Mới khai báo

      timeBatDau += tpUutien[1] - timeBatDau;
      addNhungPhanTuCungGiaTri(ListTamKhongDocQuyen[i]);
      xoaMotPhanTuKhoiListTam(ListTamKhongDocQuyen[i]);
      sapXepDoUuTien();

      for (let k = 0; k < newArr.length; k++) {
        if (timeconlai >= newArr[k][2]) {
          processTime.push([newArr[k][0]]);
          processTime[processTime.length - 1].push(timetam);
          timetam += newArr[k][2];

          timeconlai = timeconlai - newArr[k][2];
          newArr[k][2] = 0;
        } else if (timeconlai - newArr[k][2] < 0) {
          processTime.push([newArr[k][0]]);
          processTime[processTime.length - 1].push(timetam);

          newArr[k][2] = newArr[k][2] - timeconlai;
          timeconlai = 0;
          break;
        }
        if (timeconlai === 0) break;
      }

      for (let k = 0; k < newArr.length; k++) {
        if (newArr[k][2] === 0) {
          newArr.splice(k, 1);
          k = k - 1;
        }
      }

      // Đưa phần tử sau đó vào newArr, cập nhật i, xoa phần tử hiện tại do đã xử lý xong nó
      if (ListTamKhongDocQuyen[i + 1] === undefined) {
        newArr.push(ListTamKhongDocQuyen[i]);
        addNhungPhanTuCungGiaTri(ListTamKhongDocQuyen[i]);
        sapXepDoUuTien();
        check = true;
        tpUutien = newArr[0];
        break;
      } else if (ListTamKhongDocQuyen[i + 1] !== undefined) {
        if (newArr.length !== 0) {
          if (newArr[0][2] <= ListTamKhongDocQuyen[i][2]) {
            // Neu trong newArr uu tien hon trong ListTam
            newArr.push(ListTamKhongDocQuyen[i]); // Dua Listam[i] vao newArr;
            addNhungPhanTuCungGiaTri(ListTamKhongDocQuyen[i]); // Dua cac ptu cung gtri voi Listam[i] vao newArr
            xoaMotPhanTuKhoiListTam(ListTamKhongDocQuyen[i]);
            xoaNhungPhanThuTheoDK(ListTamKhongDocQuyen[i]); // Phong TH add nhung phan tu da add truoc do
            ListTamKhongDocQuyen.unshift(newArr[0]); // Dua newArr[0] vao dau mang ListTam
            newArr.shift(); // Xoa newArr[0] khoi newArr;
            tpUutien = ListTamKhongDocQuyen[i + 1];
            i = i - 1;
          } else if (newArr[0][2] > ListTamKhongDocQuyen[i][2]) {
            // Ptu ListTam uu tien cao hon
            tpUutien = ListTamKhongDocQuyen[i + 1];
            i = i - 1;
          }
        } else if (newArr.length === 0) {
          tpUutien = ListTamKhongDocQuyen[i + 1];
          i = i - 1;
        }
      }
      sapXepDoUuTien();
      // break;
    }
    if (check === true) break;
  }
};;

const xuLyThem = () => {
  for (let i = 0; i < newArr.length; i++) {
    processTime.push([newArr[i][0]]);
    processTime[processTime.length - 1].push(timeBatDau);
    timeBatDau += newArr[i][2];
  }
};

const startKhongDocQuyen = () => {
  cloneArr();
  check = false;
  timeBatDau = Number(ListTamKhongDocQuyen[0][1]);
  tpUutien = ListTamKhongDocQuyen[1]; // Xét nếu ko có ptu 1 thi ko xet them

  if (ListTamKhongDocQuyen.length === 1) {
    newArr.push(ListTamKhongDocQuyen[0]);
    addNhungPhanTuCungGiaTri(ListTamKhongDocQuyen[0]);
    sapXepDoUuTien();
    xuLyThem();
  } else {
    handleCaseKhongDocQuyen();
    xuLyThem();
  }
};


const xuLyTrungLap = () => {
  processPrint.push(processTime[0]);
  let processtam = processTime[0];
  for (let i = 1; i < processTime.length; i++) {
    if (processTime[i][0] !== processtam[0]) {
      processPrint.push(processTime[i]);
      processtam = processTime[i];
    }
  }
};

const printResultKDQ = () => {
  let arrTam = [];
  let timew = 0;
  for (let i = 0; i < ListArrClone.length; i++) {
    arrTam = [];
    for (let j = 0; j < processPrint.length; j++) {
      if (processPrint[j][0] === ListArrClone[i][0]) {
        arrTam.push(processPrint[j]); // Tên + thời điểm vào
        arrTam[arrTam.length - 1].push(ListArrClone[i][1]); // Time bắt đầu [2]
        if (processPrint[j + 1] !== undefined)
          arrTam[arrTam.length - 1].push(processPrint[j + 1][1]);
        // Time hoàn thành của nó [3]
        else arrTam[arrTam.length - 1].push(undefined);
      }
    }
    timew += arrTam[0][1] - arrTam[0][2];
    for (let k = 1; k < arrTam.length; k++) {
      timew += arrTam[k][1] - arrTam[k - 1][3];
    }
    // if(i === 3)
    //   break;
  }

  createTable();
  const data__name__1 = document.querySelector("#data__name__1");
  const data__time__1 = document.querySelector("#data__time__1");
  const average__time__1 = document.querySelector("#average__time__1");
  timemout = 300;
  for (let i = 0; i < processPrint.length; i++) {
    setTimeout(() => {
      let span_1 = document.createElement("span");
      span_1.innerHTML = `${processPrint[i][0]}`;
      data__name__1.appendChild(span_1);

      let span_2 = document.createElement("span");
      span_2.innerHTML = `${processPrint[i][1]}`;
      data__time__1.appendChild(span_2);
    }, timemout);
    timemout += 300;
  }
  let span_3 = document.createElement("span");
  span_3.innerHTML = `${timew / ListArrClone.length}`;
  average__time__1.appendChild(span_3);
};


