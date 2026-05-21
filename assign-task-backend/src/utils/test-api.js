

async function runTests() {
  const baseUrl = "http://localhost:5000";

  // 1. Login user1
  console.log("Logging in user1...");
  const loginRes1 = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "user1@example.com", password: "123456" })
  });
  const loginData1 = await loginRes1.json();
  const token1 = loginData1.accessToken;
  console.log("User 1 Token acquired:", token1 ? "Yes" : "No");

  // 2. Login user2
  console.log("Logging in user2...");
  const loginRes2 = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "user2@example.com", password: "123456" })
  });
  const loginData2 = await loginRes2.json();
  const token2 = loginData2.accessToken;
  console.log("User 2 Token acquired:", token2 ? "Yes" : "No");

  // 3. Get my tasks for User 1
  console.log("Getting User 1 tasks...");
  const tasksRes1 = await fetch(`${baseUrl}/tasks/my-tasks`, {
    headers: { "Authorization": `Bearer ${token1}` }
  });
  const tasksData1 = await tasksRes1.json();
  const user1Task = tasksData1.data[0];
  console.log("User 1 first task:", user1Task?.title, "ID:", user1Task?._id, "Current Status:", user1Task?.status);

  // 4. Get my tasks for User 2
  console.log("Getting User 2 tasks...");
  const tasksRes2 = await fetch(`${baseUrl}/tasks/my-tasks`, {
    headers: { "Authorization": `Bearer ${token2}` }
  });
  const tasksData2 = await tasksRes2.json();
  const user2Task = tasksData2.data[0];
  console.log("User 2 first task:", user2Task?.title, "ID:", user2Task?._id, "Current Status:", user2Task?.status);

  if (!user1Task || !user2Task) {
    console.error("Could not find seeded tasks. Please make sure to seed the database first by running 'npm run seed'.");
    return;
  }

  // 5. Test 1: User 1 updates their OWN task
  console.log("\n--- TEST 1: User 1 updates their own task status to IN_PROGRESS ---");
  const updateRes1 = await fetch(`${baseUrl}/tasks/my-tasks/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token1}`
    },
    body: JSON.stringify({ taskId: user1Task._id, status: "IN_PROGRESS" })
  });
  const updateData1 = await updateRes1.json();
  console.log("Result status code:", updateRes1.status);
  console.log("Result data:", JSON.stringify(updateData1, null, 2));

  // 6. Test 2: User 1 updates a task NOT assigned to them (User 2's task)
  console.log("\n--- TEST 2: User 1 tries to update User 2's task status ---");
  const updateRes2 = await fetch(`${baseUrl}/tasks/my-tasks/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token1}`
    },
    body: JSON.stringify({ taskId: user2Task._id, status: "DONE" })
  });
  const updateData2 = await updateRes2.json();
  console.log("Result status code:", updateRes2.status);
  console.log("Result data:", JSON.stringify(updateData2, null, 2));

  // 7. Test 3: Validate input schema (missing body fields)
  console.log("\n--- TEST 3: Validation test (missing status) ---");
  const updateRes3 = await fetch(`${baseUrl}/tasks/my-tasks/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token1}`
    },
    body: JSON.stringify({ taskId: user1Task._id })
  });
  const updateData3 = await updateRes3.json();
  console.log("Result status code:", updateRes3.status);
  console.log("Result data:", JSON.stringify(updateData3, null, 2));
}

runTests().catch(console.error);
