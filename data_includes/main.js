PennController.ResetPrefix(null)

DebugOff() // don't show log and errors

Sequence("consent", "instructions", "practice", "exp-start", randomize("experimental-trial"), "completion")

// consent
newTrial("consent",
    defaultText
        .center()
        .print()
    ,
    newText("1", "Welcome!")
        .bold()
    ,
    newText("sp1", " ")
    ,
    newText("1", "환영")
        .bold()
    ,
    newText("sp1", " ")
    ,
    newText("2", "Hangul works! And it also works in the button below!")
    ,
    newText("sp2", " ")
    ,
    newText("3", "Click the button below to continue. ")
    ,
    newText("sp3", " ")
    ,
    newButton("button-1", "진행하다")
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
    newText("1", "Experiment instructions:")
        .bold()
    ,
    newText("sp1", " ")
    ,
    newText("2", "In this experiment, you will be listening to two nonsensical words in a sequence. The first or second word of the sequence will have some noise that covers some of the sounds in the word. ")
    ,
    newText("sp1", " ")
    ,
    newText("3", "Your task in this experiment is to decide if the two words are the same word or different words. In your keyboard, press 'a' if you think the the two words are the same word, and press 'l' if you think the the two words are different words.")
        .bold()
    ,
    newText("sp2", " ")
    ,
    newText("3", "You should decide this even if one of the two words has some noise covering some of its sounds, or even if the words don’t mean anything to you. ")
    ,
    newText("sp3", " ")
    ,
    newText("4", "Please provide your responses as quickly as possible.")
        .bold()
    ,
    newText("sp4", " ")
    ,
    newText("5", "For example, click the button below to listen to two example words. ")
    ,
    newText("sp5", " ")
    ,
    newButton("button-listen", "click here to listen")
        .center()
        .print()
        .wait()
    ,
    newAudio("A", "ulna.wav")
        .play()
        .wait()
    ,
    newTimer("isi", 500)
        .start()
        .wait()
        ,
    newAudio("X", "ulna_masked0.wav")
        .play()
        .wait()
    ,
    newText("sp6", " ")
    ,
    newText("6", "Are the two words you heard the same word or different words? Please respond as quickly as you can.")
        .bold()
    ,
    newText("7", "(Press 'a' for 'same' and 'l' for 'different')")
        .italic()
    ,
    newKey("response", "AL")
            .log()
            .wait()
    ,
    newText("sp7", " ")
    ,
    newText("8", "You will now have some more practice. The experiment will start after this practice. There will be a brief questionnaire after you complete the experiment. ")
        .bold()
    ,
    newText("sp8", " ")
    ,
    newText("9", "During practice, adjust your volume to the desired level. ")
    ,
    newText("sp8", " ")
    ,
    newButton("button-cont", "start practice")
        .center()
        .print()
        .wait()
    ,
)

newTrial("practice",
    // shuffle order of masked and unmasked
    ax_seq = ["ulna.wav", "ulna_masked0.wav"].sort(v => 0.5-Math.random())
    ,
    // start trial
    newText("fixcross", "+") // create a fixation cross
        .css("font-size","80px")
        .print("center at 50%" , "center at 50%")
        .log()
    ,
    newTimer("pre-recordings", 100)
        .start()
    ,
    newAudio("audio0", ax_seq[0])
        .play()
        .wait()
    ,
    newTimer("isi", 500)
        .start()
        .wait()
    ,
    newAudio("audio1", ax_seq[1])
        .play()
        .wait()
    ,
    getText("fixcross")
        .remove()
    ,
    newText("instr", "(Press 'a' for 'same' and 'l' for 'different')")
        .center()
        .italic()
        .print()
    ,
    newKey("response", "AL")
        .log()
        .wait()
    ,
    getAudio("audio0")
        .wait("first")
    //,
    //newVar("RT").set(v => Date.now())
)

newTrial("exp-start",
    defaultText
        .center()
        .print()
    ,
    newText("1", "The experiment will now begin. Click the button below when you are ready to begin.")
        .bold()
    ,
    newText("sp8", " ")
    ,
    newButton("button", "start experiment")
        .center()
        .print()
        .wait()
)


Template("items.csv", row =>
    newTrial("experimental-trial",
        // select masked item with random snr
        masking = [row.mask0, row.mask4, row.mask8, row.mask_4, row.mask_8].sort(v => 0.5-Math.random())
        ,
        // shuffle order of masked and unmasked
        ax_seq = [row.nomask_cluster, masking[0]].sort(v => 0.5-Math.random())
        ,
        // start trial
        newText("fixcross", "+") // create a fixation cross
            .css("font-size","80px")
            .print("center at 50%" , "center at 50%")
            .log()
        ,
        newTimer("pre-recordings", 100)
            .start()
        ,
        newAudio("audio0", ax_seq[0])
            .play()
            .wait()
        ,
        newTimer("isi", 500)
            .start()
            .wait()
        ,
        newAudio("audio1", ax_seq[1])
            .play()
            .wait()
        ,
        getText("fixcross")
            .remove()
        ,
        newText("instr", "(Press 'a' for 'same' and 'l' for 'different')")
            .center()
            .italic()
            .print()
        ,
        newKey("response", "AL")
            .log()
            .wait()
        ,
        getAudio("audio0")
            .wait("first")
        //,
        //newVar("RT").set(v => Date.now())
    )
    .log("group", row.group) // group. tells you what repair was given in trial
    .log("item_id", row.item_id) // item id
    .log("condition", row.condition) // experimental or control condition
    .log("snr", masking[0]) // get name of recording for masked to then get snr
    .log("AX", row.AX_gold) // if same or different
)

SendResults("send")

// post-experiment language survey

// A simple final screen
newTrial ("completion" ,
    newText("Thank you for participation! The experiment is now over. ")
        .center()
        .print()
    ,
    newText("You may now close this page.")
        .center()
        .print()
    ,
    // Stay on this page forever
    newButton().wait()
)

// Missing timer: move to the next trial if no response after 2000 or 3000 ms. 

