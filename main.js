moment.locale('ru');
var app = new Vue({
  el: '.container',
  data: {
    clock: '',
    weekday: '',
    date: '',
    lesson: '',
    lesson_info: '',
    status: '',
    holiday: '',
  },
  created() {
    this.intervalId = setInterval(() => {
      this.clock = moment().format('LTS');
      this.weekday = moment().format('dddd');
      moment.relativeTimeThreshold('d', 1000);
      moment.relativeTimeThreshold('s', 59);
      moment.relativeTimeThreshold('ss', 3);
      moment.relativeTimeThreshold('m', 59);
      masHol = [moment("20211030"), moment("20211229"), moment("20220321"), moment("20220530")]
      a = moment();
      for(i = 0; i < 4; i++){
        b = masHol[i]
        if(masHol[i].diff(a)>0){
          this.holiday = masHol[i].fromNow();
          break
        }
      }
      //this.holiday = moment("20211021", "YYYYMMDD").fromNow();
      console.log(moment(20211001).diff(moment()))
      this.date = moment().format('L') + ' ' + moment().format('dddd');
      mas = ["8:00:00", "8:50:00", "9:40:00", "10:30:00", "11:20:00", "12:10:00", "13:00:00", "14:00:00", "14:50:00", "15:40:00",  "16:30:00",  "17:20:00",  "18:05:00"];
      mas_ends = ["8:40:00", "9:30:00", "10:20:00", "11:10:00", "12:00:00", "12:50:00", "13:40:00", "14:40:00", "15:30:00",  "16:20:00",  "17:10:00",  "18:00:00",  "18:45:00"];
      day_end = moment(mas[mas.length-1], "LTS");
      day_start = moment(mas[0], "LTS");
      part_end = moment("14:00", "LTS");
      if(a.diff(day_end) < 0){ //учебный день не окончен
        if(a.diff(day_start) >= 0){
          for(i = 0; i < mas.length; i++){
            b = moment(mas[i], "LTS");
            if(b.diff(a) > 0){
              if(b.diff(a) < 600000 || (b.diff(a) < 1200000 && b.diff(part_end) == 0)){
                this.lesson_info = 'Следующий урок начнется ';
                this.lesson = moment(mas[i], "LTS").from(a);
                this.status = "Перемена";
              }
              else{
                this.lesson_info = 'Текущий урок закончится ';
                this.lesson = moment(mas_ends[i-1], "LTS").from(a);
              }
              break;
            }
          }
          if(a.diff(part_end) > 0){
            if (this.status != 'Перемена'){
              this.status = 'Идет ' + (i-7) + ' урок ' + 'второй смены';
            }
          }
          else{
            if (this.status != 'Перемена'){
              this.status = 'Идет ' + (i) + ' урок ' + 'первой смены';
            }
          }
        }
        else{ //учебный день не начался
          min = -1;
          j = -1;
          for(i = 0; i < mas.length; i++){
            b = moment(mas[i], "LTS");
            dif = b.diff(a);
            if(dif > 0){ //время до ближайшего урока
              if(min == -1 || min > dif){
                min = dif;
                j = i;
              }         
            }
          }
          this.lesson = 'Следующий урок начнется ' + moment(mas[j], "LTS").from(a);
        }

      }
      else{
        this.lesson = "Учебный день окончен";
      }
    }, 1000);
  }
})


$(function() {
  $('.marquee').marquee({
    duration: 30000,
    startVisible: true,
    duplicated: true,
  });
});

//Phrase changer
let arr1 = [
"«Ни искусство, ни мудрость не могут быть достигнуты, если им не учиться»", 
"«Научиться можно только тому, что любишь»", 
"«Надо много учиться, чтобы знать хоть немного»", 
"«Ученик, который учится без желания — это птица без крыльев»", 
];
let arr2 = [
"Демокрит Абдерский", 
"Иоганн Вольфганг фон Гёте", 
"Шарль Луи де Монтескьё", 
"Саади", 
];
let pname = arr1.length *  Math.random()|0;
document.querySelector(".phrase").innerHTML = arr1[pname];
document.querySelector(".author").innerHTML = arr2[pname];
this.intervalId = setInterval(() => {
  let lastpname = document.querySelector(".phrase").innerHTML;
  let pname = arr1.length *  Math.random()|0;
  if(lastpname = pname){
      pname = arr1.length *  Math.random()|0;
  }
  document.querySelector(".phrase").innerHTML = arr1[pname];
  document.querySelector(".author").innerHTML = arr2[pname];
}, 10000);