import { Card, CardContent } from "./ui/card";

const Forbidden = () => {
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardContent>
                    <div className="h-[500px] flex flex-col items-center justify-center px-4">
                        <div className="text-center space-y-4 pt-16">
                            <h1 className="font-bold text-3xl text-[#2E2A47]">
                                OPSS!
                            </h1>
                            <p className="text-base text-[#7E8CA0]">
                                Forbidden Access
                            </p>

                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Forbidden;