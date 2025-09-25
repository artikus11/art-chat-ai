export default function ActiveReturnHelp() {
	return (
		<div>
			<h2>Правило <code>ActiveReturn</code></h2>
			<p>Реагирует на возврат пользователя на страницу</p>
			<h3>Условия:</h3>
			<ul>
				<li>- Ранее отправлял сообщение</li>
				<li>- Можно показать по кулдауну, то есть по интервалу времени, например раз в 10 часов</li>
			</ul>
			<h3>Триггер:</h3>
			<p>- События <code>focus</code> / <code>visibilitychange</code>, когда пользователь возвращается</p>
		</div>
	);
}