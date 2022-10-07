GitHubCalendar('.calendar', 'MaksBelenko');

// or enable responsive functionality:
GitHubCalendar('.calendar', 'MaksBelenko', { responsive: true });

// Use a proxy
GitHubCalendar('.calendar', 'MaksBelenko', {
    proxy(username) {
        return fetch(`https://your-proxy.com/github?user=${username}`);
    },
}).then((r) => r.text());
