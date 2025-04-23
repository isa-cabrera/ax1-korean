PennController.ResetPrefix(null)

// consent
newTrial("consent",
    defaultText
        .center()
        .print()
    ,
    newText("1", "Welcome!")
    ,
    newButton("button-1", "Click here to start")
        .center()
        .print()
        .wait()
)

// instruction
newTrial("instructions",
    defaultText
        .center()
        .print()
    ,
    newText("1", "In this experiment...")
    ,
    newButton("button-2", "Click here to start.")
        .center()
        .print()
        .wait()
)

newTrial("experiment-trial",
    newAudio("napkin", "napkin.wav")
        .play()
    ,
    newText("fix", "+") // create a fixation cross
        .css("font-size","80px")
        .print("center at 50%" , "center at 50%")
        .log()
    ,
    newKey("resp", "FJ")
        .log()
        .wait()
    ,
    //newText("instr", "(Press 'a' for 'same' and 'l' for 'different')")
    //    .center()
    //    .print()
    //,
    getAudio("napkin")
        .wait("first")
    ,
    getText("fix")
        .text("Press 'a' for 'same' and 'l' for 'different'")
)