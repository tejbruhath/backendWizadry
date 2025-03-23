function Randomizer (max) {
 
    return Math.floor(Math.random()*(max+1)).toString()
}
Randomizer(10)
export default Randomizer