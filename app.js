axios
  .get("http://api.aladhan.com/v1/timingsByCity?country=Egypt&city=Cairo")
  .then((response) => {
    let data = response.data;
    let alathan = data.data.timings;
    let hijri = data.data.date.hijri;
    let melade = data.data.date.readable;
    let day = hijri.weekday.ar;

    // دالة لتحويل الوقت إلى تنسيق 12 ساعة
    function convertTo12HourFormat(time) {
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours);
      let period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // إذا كانت الساعة 0، اجعلها 12
      return `${hours}:${minutes}`;
    }

    // إضافة التاريخ إلى العنصر
    document.getElementById("day").innerHTML += `
      <p> 
        <span>${day}</span>
        <span>${melade}</span>
        <br>
        <span>${hijri.date}</span>
        <br>
        <span id="current-time"></span> <!-- سيتم تحديث الوقت هنا -->
      </p>
    `;

    // إضافة أوقات الأذان إلى الجدول
    document.getElementById("table").innerHTML += `
      <tbody>
        <tr>
            <td>${convertTo12HourFormat(alathan.Fajr)} AM</td>
            <td>الفجر</td>
        </tr>
        <tr>
            <td>${convertTo12HourFormat(alathan.Dhuhr)} PM</td>
            <td>الظهر</td>
        </tr>
        <tr>
            <td>${convertTo12HourFormat(alathan.Asr)} PM</td>
            <td>العصر</td>
        </tr>
        <tr>
            <td>${convertTo12HourFormat(alathan.Maghrib)} PM</td>
            <td>المغرب</td>
        </tr>
        <tr>
            <td>${convertTo12HourFormat(alathan.Isha)} PM</td>
            <td>العشاء</td>
        </tr>
      </tbody>
    `;

    // دالة لتحديث الوقت الحي
    function updateTime() {
      let now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      let period = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12; // إذا كانت الساعة 0، اجعلها 12
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      let currentTime = `${hours}:${minutes}:${seconds} ${period}`;

      // تحديث الوقت في العنصر
      document.getElementById("current-time").innerText = currentTime;
    }

    // تحديث الوقت كل ثانية
    setInterval(updateTime, 1000);
  })
  .catch((error) => {
    console.error("حدث خطأ:", error);
  });
