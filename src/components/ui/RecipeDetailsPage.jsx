import { Box, Button, Image, Heading, Text, Flex } from '@chakra-ui/react';

export const RecipeDetailsPage = ({ recipe, onGoBack }) => {
  return (
    <Flex direction="column" alignItems="center">
      <Box p={4} bg="blue.100" borderRadius="md" maxW="700px">
        <Button onClick={onGoBack} mb={4}>Back to Recipe Overview</Button>
        <Heading mb={4}>{recipe.label}</Heading>
        <Image src={recipe.image} alt={recipe.label} px={4} mb={4} borderRadius="md" boxSize="700px" objectFit="cover" />
        <Text px={4} mb={2}>Meal Type: {recipe.mealType}</Text>
        <Text px={4} mb={2}>Dish Type: {recipe.dishType}</Text>
        <Text px={4} mb={2}>Total Cooking Time: {recipe.totalTime} minutes</Text>
        <Text px={4} mb={2}>Diet Label: {recipe.dietLabels.join(', ')}</Text>
        <Text px={4} mb={2}>Health Labels: {recipe.healthLabels.join(', ')}</Text>
        <Text px={4} mb={2}>Cautions: {recipe.cautions.join(', ')}</Text>
        <Text px={4} mb={2}>Ingredients:</Text>
        <ul style={{ listStyleType: 'none' }}>
          {recipe.ingredientLines.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <Text px={4} mb={2}>Servings: {recipe.yield}</Text>
        <Text px={4} mb={2}>Total Nutrients:</Text>
        <Box pl={4}>
          <Text>Energy: {recipe.totalNutrients.ENERC_KCAL.quantity} {recipe.totalNutrients.ENERC_KCAL.unit}</Text>
          <Text>Protein: {recipe.totalNutrients.PROCNT.quantity} {recipe.totalNutrients.PROCNT.unit}</Text>
          <Text>Fat: {recipe.totalNutrients.FAT.quantity} {recipe.totalNutrients.FAT.unit}</Text>
          <Text>Carbs: {recipe.totalNutrients.CHOCDF.quantity} {recipe.totalNutrients.CHOCDF.unit}</Text>
          <Text>Cholesterol: {recipe.totalNutrients.CHOLE.quantity} {recipe.totalNutrients.CHOLE.unit}</Text>
          <Text>Sodium: {recipe.totalNutrients.NA.quantity} {recipe.totalNutrients.NA.unit}</Text>
        </Box>
      </Box>
    </Flex>
  );
};
