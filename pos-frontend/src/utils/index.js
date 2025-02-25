export const getRandomBG = () => {
    const colors  = [
        "#f6b100",
        "#02ca3a",
    ];
    const color = colors[Math.floor(Math.random() * colors.length )];
    return "bg-["+color+"]";
}