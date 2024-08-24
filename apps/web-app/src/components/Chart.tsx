"use client"

import { Box, Text } from "@chakra-ui/react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// ダミーデータの生成
const generateDummyData = (days: number) => {
    const data = [];
    let yesPrice = 0.5; // 初期値を0.5ドルに設定
    for (let i = 0; i < days; i++) {
        // ランダムな変動を加える（-0.05から0.05の範囲）
        const change = (Math.random() - 0.5) * 0.4;
        yesPrice = Math.max(0, Math.min(1, yesPrice + change)); // 0から1の範囲に制限
        const noPrice = 1 - yesPrice; // NoとYesの合計が1になるように設定
        data.push({
            day: `Aug ${i + 1}`,
            Prob_of_Yes: parseFloat(yesPrice.toFixed(3)),
            No: parseFloat(noPrice.toFixed(3))
        });
    }
    return data;
};

const dummyData = generateDummyData(30); // ダミーの30日分のデータを生成

const PredictionMarketChart: React.FC = () => {
    const CustomDot = (props: any) => {
        const { cx, cy, payload, index } = props;
        if (index === dummyData.length - 1) {
            return <circle cx={cx} cy={cy} r={4} fill="#8884d8" />;
        }
        return null;
    };
    
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <Box
                    bg="white"
                    p={2}
                    border="1px solid #ccc"
                    borderRadius="md"
                    boxShadow="md"
                >
                    <Text fontWeight="bold">{label}</Text>
                    <Text color="#8884d8">
                        Yes: {(payload[0].value * 100).toFixed(1)}%
                    </Text>
                    <Text color="#82ca9d">
                        No: {((1 - payload[0].value) * 100).toFixed(1)}%
                    </Text>
                </Box>
            );
        }
        return null;
    };

    return (
        <Box height="500px">
            <Text fontSize="xl" fontWeight="bold" mb={4}>Probability of Yes</Text>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={dummyData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="day"/>
                    <YAxis tickFormatter={(value) => `${value*100}%`}/>
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                        type="monotone" 
                        dataKey="Prob_of_Yes" 
                        stroke="#8884d8" 
                        dot={<CustomDot />}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default PredictionMarketChart;

