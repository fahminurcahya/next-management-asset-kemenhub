import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabList = () => {
    return (
        <div className="flex items-center">
            <TabsList>
                <TabsTrigger value="tab-kategori-asset">Kategori Asset</TabsTrigger>
                <TabsTrigger value="tab-jenis-asset">Jenis Asset</TabsTrigger>
                <TabsTrigger value="tab-satuan-asset">Satuan</TabsTrigger>
            </TabsList>
        </div>
    );
}

export default TabList;