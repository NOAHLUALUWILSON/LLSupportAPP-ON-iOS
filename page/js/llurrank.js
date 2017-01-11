function check(){
      var inputs = document.getElementsByTagName("input");
      var chou = false;
      for (var i=0;i<5;i++){
         if (!isNotNegative(inputs[i].value)){
            alert("请输入非负整数");
            return false;
         }
      }
      return true
   }
   
   Math.log1p = Math.log1p || function(x) {
      var u = 1 + x;
      if (!(Math.abs(x) < 0.5)) {
         return Math.log(u);
      } else if (u == 1) {
         return x;
      } else {
         return Math.log(u) * (x / (u - 1));
      }
   };
   
   function cpowei1p(real, imag, theta, n) {
      var r2m1 = real * real + imag * imag + real * 2;
      var len = Math.exp(Math.log1p(r2m1) * 0.5 * n);
      var angle = (Math.atan2(imag, 1 + real) + theta) * n;
      return [len * Math.cos(angle), len * Math.sin(angle)];
   }
   
   function dftpow(prob, expect, n, w0) {
      if (n == 0) {
         return [1, 0];
      }
      var real = 0, imag = 0;
      for (var i = 0; i < prob.length; i++) {
         var w = w0 * (i - expect);
         var t = Math.sin(w * 0.5);
         real -= prob[i] * t * t * 2;
         imag += prob[i] * Math.sin(w);
      }
      return cpowei1p(real, imag, w0 * expect, n);
   }
   
   var ElevenBaseProb = [
      0.8953382542587164451099,
      0.0994820282509684939011,
      0.0050243448611600249445,
      0.0001522528745806068165,
      0.0000030758156480930670,
      0.0000000434963829023262,
      0.0000000004393574030538,
      0.0000000000031699668330,
      0.0000000000000160099335,
      0.0000000000000000539055,
      0.0000000000000000001089,
      0.0000000000000000000001
   ];
   var ElevenBaseExpect = 0.11;
   var ElevenRProb = 0.31381059609;
   var ElevenRChangeUR = 0.1;
   var SingleProb = [0.99, 0.01];
   var SingleExpect = 0.01;
   var SupportProb = [0.8, 0.2];
   var SupportExpect = 0.2;
   
   function calculate() {
      if (!check()){
         return;
      }
      var changeur = ElevenRChangeUR;
      // changeur = parseFloat(document.getElementById("changeur").value);
      var ur = parseInt(document.getElementById("ur").value);
      var elevennum = parseInt(document.getElementById("11").value);
      var scoutnum = 11*parseInt(document.getElementById("11n").value)+parseInt(document.getElementById("single").value);
      var supportnum = parseInt(document.getElementById("support").value);
      var totalnum = elevennum * 11 + scoutnum + supportnum;
      if (ur > totalnum){
         alert("impossible");
         return;
      }
      
      var ElevenProb = ElevenBaseProb.slice();
      ElevenProb[0] -= ElevenRProb * changeur;
      ElevenProb[1] += ElevenRProb * changeur;
      var ElevenExpect = ElevenBaseExpect + ElevenRProb * changeur;
      
      var len = totalnum + 1, len2 = len * 0.5;
      var w0 = Math.PI * 2 / len;
      var plt = ur;
      var peq = 1;
      for (var i = 1; i < len; i++) {
         var k = i < len2 ? i : i - len;
         var w = w0 * k;
         var ret = dftpow(ElevenProb, ElevenExpect, elevennum, w);
         var real = ret[0];
         var imag = ret[1];
         ret = dftpow(SingleProb, SingleExpect, scoutnum, w);
         var r = real;
         real = r * ret[0] - imag * ret[1];
         imag = r * ret[1] + imag * ret[0];
         ret = dftpow(SupportProb, SupportExpect, supportnum, w);
         r = real;
         real = r * ret[0] - imag * ret[1];
         imag = r * ret[1] + imag * ret[0];
         
         var wu = w * ur;
         var wl = w * (ur - 1) * 0.5;
         plt += (real * Math.cos(wl) + imag * Math.sin(wl)) * (Math.sin(wu * 0.5) / Math.sin(w * 0.5));
         peq += real * Math.cos(wu) + imag * Math.sin(wu);
      }
      plt /= len;
      peq /= len;
      var yourrank = plt + peq * 0.5;
      
      var ltpercent = Math.max(0, Math.min(1, plt)) * 100;
      var eqpercent = Math.max(0, Math.min(1, peq)) * 100;
      if (ur == 0)
         document.getElementById("result").innerHTML = "有"+eqpercent.toFixed(4)+"%的玩家和你人品一样";
      else
         document.getElementById("result").innerHTML = "你的人品已经击败了"+ltpercent.toFixed(4)+"%的玩家，有"+eqpercent.toFixed(4)+"%的玩家和你人品一样";
      var species = '';
      if (yourrank < 0.01)
         species = '酋长';
      else if (yourrank < 0.15)
         species = '非洲人';
      else if (yourrank < 0.35)
         species = '偏黑亚洲人';
      else if (yourrank < 0.65)
         species = '亚洲人';
      else if (yourrank < 0.85)
         species = '偏白亚洲人';
      else if (yourrank < 0.99)
         species = '欧洲人';
      else
         species = '官托';
      document.getElementById("species").innerHTML = '鉴定结果： '+species;
   }