PennController.ResetPrefix(null)

Sequence("consent", "instructions", randomize("experimental-trial"), "completion")

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

Template("items.csv", row =>
    newTrial("experimental-trial",
        audios = [row.masked, row.unmasked].sort(v => 0.5-Math.random())
        ,
        newTimer("pretrial-time", 100)
            .start()
        ,
        newText("fix", "+") // create a fixation cross
            .css("font-size","80px")
            .print("center at 50%" , "center at 50%")
            .log()
        ,
        newAudio("audio0", audios[0])
            .play()
        ,
        newTimer("interval", 900)
            .start()
            .wait()
        ,
        newAudio("audio1", audios[1])
            .play()
            .wait()
        ,
        getText("fix")
            .remove()
        ,
        newText("instr", "(Press 'a' for 'same' and 'l' for 'different')")
            .center()
            .italic()
            .print()
        ,
        newKey("resp", "AL")
            .log()
            .wait()
        ,
        getAudio("audio0")
            .wait("first")
        ,
        newVar("RT").set(v => Date.now())
    )
    .log("AX", row.AX)
    .log("RT", getVar("RT"))
)

SendResults("send")

// A simple final screen
newTrial ( "final" ,
    newText("The experiment is over. Thank you for participating!")
        .print()
    ,
    newText("You can now close this page.")
        .print()
    ,
    // Stay on this page forever
    newButton().wait()
)

// Missing timer: move to the next trial if no response after 2000 or 3000 ms. 

