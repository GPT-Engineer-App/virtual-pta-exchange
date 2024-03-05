import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Text, Image, useToast, VStack, HStack, Textarea, useNumberInput, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaExchangeAlt, FaCreditCard, FaArrowRight } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [amount, setAmount] = useState("");
  const [cardDetails, setCardDetails] = useState(null);

  const handlePurchase = () => {
    if (!amount) {
      toast({
        title: "Error",
        description: "Please enter an amount to purchase",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    // This is a mockup, in a real app a backend service would generate these details
    setCardDetails({
      cardNumber: "1234 5678 9012 3456",
      expirationDate: "12/25",
      cvv: "123",
    });
    toast({
      title: "PTA Purchase Successful",
      description: "Your virtual PTA card has been generated!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 10,
    defaultValue: 100,
    min: 100,
    max: 10000,
    precision: 2,
    onChange: (value) => setAmount(value),
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ isReadOnly: true });

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl" textAlign="center">
          Welcome to EasyPTA
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Purchase your Personal Travel Allowance easily and receive a virtual card instantly.
        </Text>
        <Flex direction={["column", "row"]} width="full" justify="center" align="center">
          <FormControl id="currency-amount" width={["full", "250px"]}>
            <FormLabel>Enter Amount in USD</FormLabel>
            <HStack maxW="320px">
              <Button {...dec}>-</Button>
              <NumberInput {...input}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper {...inc} />
                  <NumberDecrementStepper {...dec} />
                </NumberInputStepper>
              </NumberInput>
              <Button {...inc}>+</Button>
            </HStack>
          </FormControl>
          <Button leftIcon={<FaExchangeAlt />} colorScheme="teal" variant="solid" ml={[0, 3]} mt={[3, 0]} onClick={handlePurchase}>
            Purchase PTA
          </Button>
        </Flex>
        {cardDetails && (
          <Box p={5} shadow="md" borderWidth="1px" width="full">
            <Heading as="h3" size="lg">
              Virtual PTA Card Details
            </Heading>
            <VStack mt={4} alignItems="flex-start">
              <Text>Card Number: {cardDetails.cardNumber}</Text>
              <Text>Expiration Date: {cardDetails.expirationDate}</Text>
              <Text>CVV: {cardDetails.cvv}</Text>
            </VStack>
          </Box>
        )}
        <Flex direction="column" align="center">
          <Heading as="h2" size="md" mb={4}>
            Currency Exchange
          </Heading>
          <Image src="https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjdXJyZW5jeSUyMGV4Y2hhbmdlfGVufDB8fHx8MTcwOTY1MDU1Nnww&ixlib=rb-4.0.3&q=80&w=1080" boxSize="150px" />
          <Text fontSize="md" mt={2}>
            Get competitive exchange rates for your currency conversions.
          </Text>
        </Flex>
      </VStack>
    </Container>
  );
};

export default Index;
