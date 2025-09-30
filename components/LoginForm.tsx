import React, { useState } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  Image,
  Alert,
  HStack,
  IconButton,
  CloseIcon,
  Collapse,
  ScrollView,
} from "native-base";
import { StyleSheet } from "react-native";
import { login, getToken } from "../services/auth-service";
import { register } from "../services/regristration-service";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    textAlign: "center",
  },
});

const image = require("../assets/abakus.png");

function LoginForm() {
  const [brukernavn, setBrukernavn] = useState(""); // State for brukernavn
  const [passord, setPassord] = useState(""); // State for passord

  const handleLogin = async () => {
    try {
      await login(brukernavn, passord);
      console.log("Login successful!");
      // Naviger videre eller lagre token her
    } catch (error) {
      console.log("ERROR");
      // setErrorMessage("Feil brukernavn eller passord");
    }
  };

  async function tryRegister() {
    const tall = await getToken();
    console.log("tall", tall);
    register(
      "3846",
      "0.Qm66Gt8qJwUpG5VoD9an9ftbAQJPEvnZupomUvYSwmRvka_8q0Gwwsm3t3UsRfKEd9pl1QVatmYSEnS4HxZswgGHNLe7azMZbPHbSde-EB44LhY1a9X5rjpAg6W4AVbO682CcG5VCw-8VZr3p_D8hxdmhdg-_jk2Ve24QI5W7S98wHnpIfihsiVF7aMeqdallC5JkQasRxEY6RyzBnNSl2qZIYGXILQDS-uouVje_iLHQhZjLMX4YnTK0V0zum3tlTSBM5PPTfmfIGYa5R6N8lfGN1HvY1czkgQj4PiiZBMIMYTFZYEk3nRhpDS0WmsX8yvRAhtGKyy5YRCDqDWOHCvtZ2diiluHBLgksRVvNUnYI_InqRfg_aQgL38faHjk0eLDz89iLaahP_dJbcOqlAM9vzXLOYNp_VqExyOqsUnHDTKSNprnwrdR0x8yFWiMQrrZMbaof-w-LADufQs35g2xmg7qbtM5WhDR9z8WZJeAu9FyUGtARl8KsNj6dZhACieTAhUNyy4u4qVSnjE_XR8Xxq7eO94j1ddZXAnZNdjYzjWFs0VbQGPS4j29h5U4UHtV9gJ4Kx-Ds9mHjpPgkcQGLxIhVqcuyr7-m9b4Z7DlUoK5Fvk3ZqeOjDkIcKaJ51tO3IGzNc83s5G8nCet-iczVnpCsiOc22AbyfI6W01Cyov48G_ES23TFi0hM-1t1Ofuk7hZkpL0khW_ovktzufk-7W01c7Fac-7yQlrKQjWy-7hI0zjOh2PzYbm8bRrYhwF6xplDF4S_BJjn2zWk-K_HJHLl2plzAeAaxfEW_GMdglKQLdmHfJ0bv3sa-8au6Ks6tNKTsyt7_I4jGaR-duCO7URx-IcoWk_zCEX6bI.ck4JMTHfxXK0pkIjAADnug.ed01d80977c76fe2ec2eb48a433404fd1ff2a022114e5d45704141e74382e286",
      "",
      tall?.toString()
    );
  }

  // const WrongInformationGivenError = (
  // <Collapse isOpen={show} duration={20}>
  //   <Alert
  //     w="285"
  //     status="error"
  //     marginTop="5"
  //     onTouchEndCapture={() => setShow(false)}
  //   >
  //     <VStack space={1} flexShrink={1} w="100%">
  //       <HStack
  //         flexShrink={1}
  //         space={2}
  //         alignItems="center"
  //         justifyContent="space-between"
  //       >
  //         <HStack space={2} flexShrink={1} alignItems="center">
  //           <Alert.Icon />
  //           <Text fontSize="md" color="coolGray.800">
  //             Feil brukernavn eller passord
  //           </Text>
  //         </HStack>
  //         <IconButton
  //           variant="unstyled"
  //           _focus={{
  //             borderWidth: 0,
  //           }}
  //           icon={<CloseIcon size="3" />}
  //           _icon={{
  //             color: "coolGray.600",
  //           }}
  //         />
  //       </HStack>
  //     </VStack>
  //   </Alert>
  // </Collapse>
  // );
  return (
    <ScrollView w="100%" h="80">
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Image source={image} alt="abakus-logo" width={80} height={55} />
          {/* {WrongInformationGivenError} */}
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            style={styles.container}
          >
            <Text>Login</Text>
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>
                <Text>Brukernavn </Text>
              </FormControl.Label>

              <Input value={brukernavn} onChangeText={setBrukernavn} />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <Text>Passord</Text>
              </FormControl.Label>
              <Input
                type="password"
                value={passord}
                onChangeText={setPassord}
              />
            </FormControl>
            {/* <Button mt="1" colorScheme="red" onPress={() =>   {setShow(true)}> */}
            <Button mt="1" colorScheme="red" onPress={() => handleLogin()}>
              <Text color="white" fontSize="xl">
                Logg inn
              </Text>
            </Button>
            <Button onPress={getToken}>
              <Text>Console log logintoken</Text>
            </Button>
            <Button onPress={tryRegister}>
              <Text color="white" fontSize="xl">
                testknapp for å bruteforce påmelding, ikke trykk hvis ikke
                meningen
              </Text>
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
}

export default LoginForm;
