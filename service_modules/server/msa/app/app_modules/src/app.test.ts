export class AppTest {
    tt() {
        let ttCurrent = Date.now();
        let ttNew = ttCurrent + 60 * 60;

        let dateCurrent = new Date(ttCurrent * 1000);
        let dateNew = new Date(ttNew * 1000);


        console.log('time');
        console.log(dateCurrent);
        console.log(dateNew);
    }
}