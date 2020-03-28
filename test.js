const regex = new RegExp("([\\d]+)\\sResults$","");
const str = `Houses for sale in Dublin - 2541 Results`;
let m = str.match(regex);
console.log(m.length)
// while ((m = regex.exec(str)) !== null) {
//     // This is necessary to avoid infinite loops with zero-width matches
//     if (m.index === regex.lastIndex) {
//         regex.lastIndex++;
//     }
    
//     // The result can be accessed through the `m`-variable.
//     console.log(m);
//     m.forEach((match, groupIndex) => {
//         console.log(`Found match, group ${groupIndex}: ${match}`);
//     });
// }