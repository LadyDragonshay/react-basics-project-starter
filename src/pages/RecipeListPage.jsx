import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Checkbox,
  useBreakpointValue,
} from "@chakra-ui/react";
import { data } from "../utils/data";

export const RecipeListPage = ({ onRecipeSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    vegan: false,
    vegetarian: false,
    pescatarian: false,
  });
  const recipes = data.hits.map((hit) => hit.recipe);

  // Get the number of columns based on screen size
  const numColumns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

  // Filtering function based on search term, dietary preferences, and health labels
  const filteredRecipes = recipes.filter((recipe) => {
    const nameMatch = recipe.label
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const dietLabelsMatch =
      (filters.vegan && recipe.dietLabels.includes("Vegan")) ||
      (filters.vegetarian && recipe.dietLabels.includes("Vegetarian")) ||
      (filters.pescatarian && recipe.dietLabels.includes("Pescatarian"));
    const healthLabelsMatch =
      (filters.vegan && recipe.healthLabels.includes("Vegan")) ||
      (filters.vegetarian && recipe.healthLabels.includes("Vegetarian")) ||
      (filters.pescatarian && recipe.healthLabels.includes("Pescatarian"));
    return (
      nameMatch &&
      (dietLabelsMatch ||
        healthLabelsMatch ||
        (!filters.vegan && !filters.vegetarian && !filters.pescatarian))
    );
  });

  // Click handler for selecting a recipe
  const handleRecipeSelect = (recipe) => {
    onRecipeSelect(recipe);
  };

  console.log("Props inside RecipeListPage:", {
    onRecipeSelect,
    searchTerm,
    filters,
    recipes,
    numColumns,
    filteredRecipes,
  });

  return (
    <Flex direction="column" alignItems="center">
      <Heading as="h1" size="xl" mb={4}>
        Elvira Recipe Checker
      </Heading>
      <input
        type="text"
        placeholder="Search by recipe name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      />
      <Flex mb={4}>
        <Checkbox
          isChecked={filters.vegan}
          onChange={(e) => setFilters({ ...filters, vegan: e.target.checked })}
          mr={2}
        >
          Vegan
        </Checkbox>
        <Checkbox
          isChecked={filters.vegetarian}
          onChange={(e) =>
            setFilters({ ...filters, vegetarian: e.target.checked })
          }
          mr={2}
        >
          Vegetarian
        </Checkbox>
        <Checkbox
          isChecked={filters.pescatarian}
          onChange={(e) =>
            setFilters({ ...filters, pescatarian: e.target.checked })
          }
        >
          Pescatarian
        </Checkbox>
      </Flex>
      <Flex flexWrap="wrap" justifyContent="center">
        {filteredRecipes.map((recipe) => (
          <Box
            key={recipe.label}
            w={`calc(${100 / numColumns}% - 1rem)`} // Adjust width to create four columns with some gap
            mx="0.5rem" // Adjust margin for spacing between columns
            mb={8}
            boxShadow="md"
            p={4}
            bg="blue.100"
            borderRadius="md"
            onClick={() => handleRecipeSelect(recipe)}
          >
            <Image
              src={recipe.image}
              alt={recipe.label}
              borderRadius="md"
              mb={4}
              boxSize="500px"
              objectFit="cover"
            />
            <Heading as="h2" size="md" mb={2}>
              {recipe.label}
            </Heading>
            <Text mb={2}>Diet Label: {recipe.dietLabels.join(", ")}</Text>
            <Text mb={2}>Cautions: {recipe.cautions.join(", ")}</Text>
            <Text mb={2}>Meal Type: {recipe.mealType}</Text>
            <Text mb={2}>Dish Type: {recipe.dishType}</Text>
            <Text mb={2}>Health Labels: {recipe.healthLabels.join(", ")}</Text>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};
