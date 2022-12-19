# Habit App

## Description

This is a non-punishing app that will help the user form habits.

## Rules (In progress)

1. Have two groups: "stable habits" and "unstable habits"
2. It takes 66 days on average to form a habit, but it's actually a range depending on the person and the habit (from 18 days to 254 days)
3. 66 days is the default streak that you need to have in order to change an "unstable habit" to a "stable habit"
4. Maybe the number of days can be changed somehow? Idk how. Set it yourself? Or some kind of computation depending on your streaks and broken streaks but I don't want to think about this right now.
5. If a "stable habit" is a daily task, and you miss 3 days, it will be demoted to an "unstable habit". When this happens, you can provide a reason (or not lol) why the habit was broken so you can revisit it later when you try again.
6. You can only add 1 "unstable habit" at a time, to prevent being overwhelmed. This is your main focus.
7. You can add any number of "stable habits". Honor system na lang lol.
8. If you have more than 1 "unstable habit" somehow, you need to choose between them. You need to delete one. This will gray it out or something idk. Or maybe there's a setting where you can have up to 3 unstable habits idk not sure. I'm not sure if this is a good idea lol. Actually baka it might incentivize me to lie lol so maybe don't delete them. Maybe choose na lang which will be your main focus.
9. With "stable habits", you don't need to mark them all done, automatic na siya na green everyday because it's annoying to be asked everyday. You only need to mark it if you didn't do it a particular day. Be honest hopefully lol. Maybe there's this button saying "Yup this is still accurate, I'm still doing it" Last checked some_date_here. If, after a lot of days, you haven't checked that habit, there will be a pop up to ask you to update its status. Idk is that annoying?
10. All days are editable, (green to gray, gray to green) you don't need to check the app everyday. It won't punish you.
11. Hoping on the honesty of the user who is me lol.
12. The only thing you need to mark everyday or every whatever day is your 1 unstable habit.
13. If you have been doing your unstable habit for 66 days (or whatever number of days), then it would be a big deal, so big dopamine hit lol. You can also start another unstable habit.
14. There should be a warning if a stable habit is about to be demoted to an unstable habit. (2 consecutive days not done)
15. When setting up a new unstable habit for the first time, there would be a guide for the user to make it a small step muna. Give examples like, if you want to go to the gym early, make it so that you wake up early muna ganun. The unstable habit can also evolve. From "wake up early" to "wake up early and change to gym shoes" and then to "wake up early and change to gym clothes" until you reach your main goal to go to the gym early. Ganern. I'm not completely sure how to implement this. Maybe after a certain number of days, there would be a pop-up asking you to edit the unstable habit to its next step or something. Idk. Or make it so that these steps are the children of your main goal.
16. Make the stable habits very pretty/cool so it's a dopamine hit when you see them. It should look better the longer it is.
17. There is an option where you only half assed the task. (e.g. You only flossed your bottom teeth instead of all your teeth lol) This will continue your streak pa rin. So there are 3 colors na, gray, dark green, green.
18. You can choose to reward yourself when you hit a number of days that you have set (e.g. I will buy myself a slice of Gouda when I hit 15 days)
19. Make an option to set an alarm during a particular time. Either that or a trigger/situation. What happens before or after the habit?
20. Display your progress in percentage, current streak, longest streak.
21. Just an idea: stable habits can evolve to solidified habits. There can be 10 levels, all levels named after the mohs scale levels. (Talc to Diamond)
22. Add a sound/animation when you update a day
23. When you drag through squares, they all change to green or darkgreen or whatever
24. Add a legend on the green colors of the calendar

## Known bugs

1. When switching from an empty route to a route like Add Habit or Test Habits, the navbar jumps. It's not super aligned.

## What I learned

1. Use setHabits only once every update. Don't use more than two functions to use setHabits at the same time.
2. !"" === true lmao
3. Convert dates to utc for cases where dates span a DST change
4. Use onSubmit for forms instead of onClick, so that the "required" fields work
5. Cannot use useRef outside of the thing you ref lmao

# To Dos

1. Make card options work; it has more info, update, delete, etc
<!-- 2. Make StableCalendarCard and UnstableCalendarCard -->
<!-- 3. Make unstable habit limit work -->
4. Make auto check for stable habit cards; it can be turned off in options (is this a bad idea?)
5. Make a filter by date, streak, etc
6. Add instructions on top; it can be turned off in options
7. Add legends at the bottom; it can be turned off in options
8. Store in local storage
9. Firebase
10. If auto check for stable habits is turned on, make a reminder to update the habit when it hasn't been updated in a while, maybe 30 days or something.
11. Stats
12. Add month names on year calendar
13. Add a visual reminder if a stable habit is about to be demoted
14. There will be a StableStatsCard and UnstableStatsCard
15. Put something on screen when there is nothing to list (e.g. there are no stable habits, no unstable habits, or both)
16. Actually code lol
17. Make something happen (maybe use party-js) when an unstable habit gets promoted to a stable habit. Right now it just disappears when viewed from Home.