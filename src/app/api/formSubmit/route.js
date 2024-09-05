const { NextResponse } = require("next/server")

export const POST = async(req) => {
    const body = await req.json()
    console.log("body in api route - ",body);
    console.log(body.files.front.File);
    
    
return NextResponse.json({message:"success", body:body})
}