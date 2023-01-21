export const dynamicTitle = (step: number) => {
    let list = {
        1: '<span>Lets <br /> onboard to <br />Leftout</span>',
        2: '<span>Few more <br />Details</span>',
        3: '<span>and here you <br />go!!</span>'
    }
    // @ts-ignore
    return list[step as any]
}