import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  Button,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import RenderHTML from "react-native-render-html";
import { WebView } from "react-native-webview";
import useEvent from "../components/Hooks/useEvent";
import colors from "../components/Themes/Colors";
import sizes from "../components/Themes/Sizes";
import useEventSlug from "../components/Hooks/UseEventSlug";
import { getToken } from "../services/auth-service";
import { register, unregister } from "../services/regristration-service";
import useLoggedInUser from "../components/Hooks/useUsers";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../components/Admissions/EventItem";
import { useNavigation } from "@react-navigation/native";
import { useWebSocket } from "../components/Hooks/useWebSocket";

function ShowEvent({ route }) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.additiveBackground,
      borderRadius: sizes.spacingXl,
      marginTop: sizes.spacingMd,
    },
    buttonText: {
      color: colors.legoFontColor,
      padding: sizes.spacingSm,
    },
    centeredView: {
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
    },
    closeModalButton: {
      backgroundColor: colors.additiveBackground,
      borderRadius: sizes.spacingXl,
      justifyContent: "flex-end",
      marginTop: 10,
    },
    container: {
      flex: 1,
      width: "100%",
    },
    contentContainer: {
      alignItems: "center",
      width: "100%",
    },
    // eslint-disable-next-line react-native/no-color-literals
    eventTypeText: {
      color: "#000",
      fontSize: 14,
      paddingVertical: 5,
      textAlign: "center",
    },
    image: {
      height: 150,
      resizeMode: "cover",
      width: "100%",
    },
    line: {
      height: 2,
      marginTop: 10,
      resizeMode: "contain",
      width: "96%",
    },
    // eslint-disable-next-line react-native/no-color-literals
    modalView: {
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 20,
      height: "60%",
      margin: 20,
      padding: 35,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      width: "80%",
    },
    scroll: {
      flex: 1,
      marginLeft: 14,
    },
    stack: {
      alignItems: "center",
      padding: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      paddingVertical: 10,
      textAlign: "center",
    },
    webViewContainer: {
      height: 150, // Reduced height to fit content better
      width: "90%", // Slightly reduced from 100% to avoid edge issues
      // eslint-disable-next-line react-native/sort-styles
      marginVertical: 10,
    },
    // eslint-disable-next-line react-native/no-color-literals, react-native/sort-styles
    webView: {
      backgroundColor: "transparent", // Make background transparent
    },
  });

  useWebSocket();

  const result = useEvent(route.params.id);
  const resultSlug = useEventSlug(route.params.slug);
  const loggedInUser = useLoggedInUser();

  const ImgUrl = result.data?.cover;
  const eventType = result.data?.eventType;
  const [modalVisible, setModalVisible] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const eventDescriptionText = resultSlug.data?.text;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getColor = () => {
    if (eventType === "company_presentation") return "#17c964";
    if (eventType === "event") return "#FF0000";
    if (eventType === "social") return "#FF0000";
    if (eventType === "course") return "#0000FF";
    if (eventType === "lunch_presentation") return "#40E0D0";
    if (eventType === "alternative_presentation") return "#40E0D0";
    if (eventType === "party") return "#40E0D0";
    if (eventType === "kid_event") return "#40E0D0";
    if (eventType === "breakfast_talk") return "#40E0D0";
    if (eventType === "other") return "#40E0D0";
    return "#000000";
  };

  const getEventType = () => {
    if (eventType === "company_presentation") return "Bedriftspresentasjon";
    if (eventType === "event") return "Arrangement";
    if (eventType === "social") return "Sosialt";
    if (eventType === "course") return "Kurs";
    if (eventType === "lunch_presentation") return "Lunshpresentasjon";
    if (eventType === "alternative_presentation")
      return "Alternativ bedriftspresentasjon";
    if (eventType === "party") return "Fest";
    if (eventType === "kid_event") return "KID-arrangement";
    if (eventType === "breakfast_talk") return "Forkostforedrag";
    if (eventType === "other") return "Annet";
    return "Fant ikke arrangement type";
  };

  const sitekey = "1x00000000000000000000AA"; // "0x4AAAAAAAA7Bvl8XY3na6zV";

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      <style>
        html, body {
          margin: 0;
          padding: 0;
          background-color: transparent;
          height: auto;
          overflow: hidden;
        }
        body {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .cf-turnstile {
          margin: 0;
          transform-origin: center;
        }
      </style>
    </head>
    <body>
      <div 
        class="cf-turnstile" 
        data-sitekey="${sitekey}" 
        data-callback="onSuccess">
      </div>

      <script>
        function onSuccess(token) {
          window.ReactNativeWebView.postMessage(token);
          // After success, let React Native know widget height
          const widgetHeight = document.body.scrollHeight;
          window.ReactNativeWebView.postMessage('height:' + widgetHeight);
        }
        
        // Wait for widget to load, then report actual height
        window.addEventListener('load', function() {
          setTimeout(function() {
            const widgetHeight = document.body.scrollHeight;
            window.ReactNativeWebView.postMessage('height:' + widgetHeight);
          }, 1000); // Give widget time to render
        });
      </script>
    </body>
    </html>
  `;

  // State to dynamically adjust WebView height based on content
  const [webViewHeight, setWebViewHeight] = useState(150);

  const handleWebViewMessage = (event) => {
    const message = event.nativeEvent.data;

    // Process height updates from WebView
    if (message.startsWith("height:")) {
      const height = parseInt(message.split(":")[1], 10);
      if (height > 0 && height < 300) {
        // Reasonable bounds check
        setWebViewHeight(height);
      }
    } else {
      // Process Turnstile token
      setCaptchaToken(message);
      console.log("Turnstile Token:", message);
    }
  };

  async function handleRegister(
    eventId: string,
    captcha: string,
    feedback: string
  ) {
    const userId = await getToken();
    console.log("userId", userId);
    register(eventId, captcha, feedback, userId?.toString());
  }

  async function handleUnregister(eventId: any, eventRegistrationId: any) {
    const userToken = await getToken();
    unregister(eventId, eventRegistrationId, userToken);
  }

  const findRegistrationIdByUserId = (data: any, targetUserId: any) => {
    // Loop through each pool
    // eslint-disable-next-line no-restricted-syntax
    for (const pool of data?.pools || []) {
      // Loop through each registration in the pool
      // eslint-disable-next-line no-restricted-syntax
      for (const registration of pool.registrations || []) {
        // Check if this registration belongs to the target user
        if (registration.user.id === targetUserId) {
          return registration.id;
        }
      }
    }

    // Return null if no matching registration is found
    return null;
  };

  const handleRegistrationButton = async () => {
    if (!captchaToken) {
      console.warn("Captcha token is missing.");
      return;
    }

    const eventId = resultSlug.data?.id?.toString();
    const registrationId = findRegistrationIdByUserId(
      resultSlug.data,
      loggedInUser.data?.id
    );

    try {
      setIsRegistering(true);

      if (resultSlug.data?.isAdmitted && registrationId) {
        await handleUnregister(eventId, registrationId);
      } else {
        await handleRegister(result.data?.id, captchaToken, "");
      }

      // Force refetch as a backup
      resultSlug.refetch();
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Image source={{ uri: ImgUrl }} style={styles.image} />
          <Text style={styles.title}>{result.data?.title}</Text>
          <Text style={[styles.eventTypeText, { color: getColor() }]}>
            {getEventType()}
          </Text>
          <View style={[styles.line, { backgroundColor: getColor() }]} />

          {/* WebView Container with dynamic height */}
          <View style={[styles.webViewContainer, { height: webViewHeight }]}>
            <WebView
              originWhitelist={["*"]}
              source={{ baseUrl: "https://abakus.no", html: htmlContent }}
              onMessage={handleWebViewMessage}
              style={styles.webView}
              javaScriptEnabled
              domStorageEnabled
              startInLoadingState
              scalesPageToFit
              backgroundColor="transparent"
              // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
              containerStyle={{ backgroundColor: "transparent" }}
            />
          </View>

          <NativeBaseProvider>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>Se informasjon</Text>
            </TouchableOpacity>
          </NativeBaseProvider>

          <View style={styles.stack}>
            <Text>{result.data?.startTime}</Text>
          </View>
        </ScrollView>

        {/* Modal for event description */}
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView
                style={styles.scroll}
                // eslint-disable-next-line react-native/no-inline-styles
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: "flex-start",
                  width: "87%",
                  paddingRight: 10,
                }}
                horizontal={false}
              >
                <RenderHTML source={{ html: eventDescriptionText }} />
              </ScrollView>
              <Pressable
                style={styles.closeModalButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.buttonText}>Lukk</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.button}>
          <Button
            title={
              // eslint-disable-next-line no-nested-ternary
              isRegistering
                ? "Behandler..."
                : resultSlug.data?.isAdmitted
                ? "Avregistrer"
                : "Meld deg på"
            }
            onPress={handleRegistrationButton}
            color={resultSlug.data?.isAdmitted ? "red" : "blue"}
            disabled={isRegistering}
          />
        </View>
        {/* viewen og knappen under er for å sjekke hva jeg har tilgang til av data */}
        <View style={styles.button}>
          <Button
            title="console log"
            onPress={() =>
              console.log(
                "test",
                loggedInUser.data?.id,
                findRegistrationIdByUserId(
                  resultSlug.data,
                  loggedInUser.data?.id
                ),
                resultSlug.data
              )
            }
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default ShowEvent;
