import { Text } from 'react-native';

type props = {
    adventure: {
        title: string;
    };
    character: {};
};
export default function Character({ adventure, character }: props) {
    return <Text>{adventure.title}</Text>;
}
