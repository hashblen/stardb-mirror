(function () {
	fetch(`https://sg-public-api.hoyolab.com/common/badge/v1/login/info?game_biz=hkrpg_global&lang=en-us&ts=${Date.now()}`, {
		credentials: 'include'
	}).then(res => res.json()).then(body => {
		fetch(`https://sg-public-api.hoyolab.com/event/rpgcultivate/achievement/list?game=hkrpg&game_biz=hkrpg_global&badge_region=${body.data.region}&badge_uid=${body.data.game_uid}&show_hide=false&need_all=true`, {
			credentials: 'include'
		}).then(res => res.json()).then(body => {
			const data = {
				hsr_achievements: body.data.achievement_list.filter(a => a.finished).map(a => Number(a.id))
			};
			const json = JSON.stringify(data, null, null);
			navigator.clipboard.writeText(json).then(() => {
				alert(`Exported ${data.hsr_achievements.length} achievement(s) to clipboard.`);
			}).catch(() => {
				const blob=new Blob([json],{type:'application/json'});
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = 'stardb-achievements.json';
				a.click();
				a.remove();
				alert(`Exported ${data.hsr_achievements.length} achievement(s).`);
				alert(`Failed to copy to clipboard but downloaded ${data.hsr_achievements.length} achievement(s).`);
			});
		});
	});
})();
