export default function ReturningHelp() {
	return (
		<div>
			<h2>Правило <code>Returning</code></h2>
			<p>Приглашает вернувшегося, который <strong>открывал чат</strong>, но <strong>не писал сообщение</strong></p>
			<h3>Условия:</h3>
			<ul>
				<li>- Открывал чат</li>
				<li>- Не отправлял сообщение</li>
				<li>- Был <strong>от 2 до 10 минут назад</strong></li>
				<li>- <code>welcome</code> уже показан</li>
				<li>- <code>followup</code> уже показан</li>
				<li>- Можно показать по кулдауну, то есть по интервалу времени, например раз в 10 часов</li>
			</ul>
			<h3>Триггер:</h3>
			<p>- После закрытия чата + задержка (например, 10 секунд)</p>
		</div>
	);
}