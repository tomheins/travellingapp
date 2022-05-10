import {datechecker1} from "./datetesting1";

test("checking that the start date is earlier than the end date",()=>{

    expect(datechecker1(6,5)).toBe(null);
})