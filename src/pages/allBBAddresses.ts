const allBBAddresses: string[] = [];

for (let i = 0; i < 8888; i++) {
  allBBAddresses.push(
    "Boba" +
      i.toString().padStart(4, "0") +
      "SWtcLacv9Un9xm9DUu8dmfStf6gW3UCbkpBB"
  );
}

export const getBBAddress = (id: number) => {
  return allBBAddresses[id - 1];
};
