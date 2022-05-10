import {datechecker2} from "./datetesting2";

test("checking that the current date is older than the start date",()=>{

    expect(datechecker2(2,3)).toBe(null);
})